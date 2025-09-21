//importing
const express=require("express")
require("./connection")
var userModel=require("./model/user")
var productModel=require("./model/product")
var cartModel=require("./model/cart")
var cors = require('cors')


//initialising
const app= express()
//mid
app.use(express.json())
app.use(cors())


// login
app.post("/login", async (req, res) => {
  try { 
    const user = await userModel.findOne({ Email: req.body.Email });
    if (!user) {
      return res.send({success:false, message:"User not found"});
    }
    if (user.Password === req.body.Password) {
      return res.send({
        success:true,
        message: "Logged in successfully",
        userType: user.userType,
        name: user.Username,       
        email: user.Email,     
        userId: user._id
      });
    } else {
      return res.send({success:false,message:"Invalid credentials"});
    }
  } catch (error) {
    console.log(error);
    return res.send({success:false,message:"An error occurred"});
  }
})
//User api
// to create signup data
app.post("/signup", async (req, res) => {
  try {
    const exist = await userModel.findOne({ Email: req.body.Email })
    const usernameexist =await userModel.findOne({Username: req.body.Username})
    if(usernameexist){
      return res.json({success:false,message:"username already exist"})
    }
    if(exist){
      return res.json({success:false,message:"Email already exist"})
    }
    await userModel(req.body).save();
    res.send({success:true,message:"Signed up successful!!"});
  } catch (error) {
    console.log(error);
  }
});


app.get("/view",async(req, res)=>{
    var newdata=await userModel.find()
    res.send(newdata)
})

app.put("/update/:id",async(req, res)=>{
    await userModel.findByIdAndUpdate(req.params.id,req.body)
    res.send("data updated")
})

//prouct api
app.post("/add/product/",async(req, res)=>{
    await productModel(req.body).save()
    res.send("Data Added")
})

app.get("/view/product",async(req, res)=>{
    var newdata=await productModel.find()
    res.send(newdata)
})

app.delete("/remove/product/:id",async(req, res)=>{
    await productModel.findByIdAndDelete(req.params.id)
    res.send("Data Deleted")
})

app.put("/update/product/:id",async(req, res)=>{
    await productModel.findByIdAndUpdate(req.params.id,req.body)
    res.send("data updated")
})

//cart api
app.post("/add/cart/:userId", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // find the user
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    // check if product already exists in cart
    const existingItem = user.cartData.find(
      (item) => item.product.toString() === productId
    );

    const qty = Number(quantity) || 1;

if (existingItem) {
  existingItem.quantity += qty;
} else {
  user.cartData.push({ product: productId, quantity: qty });
}

    await user.save();
    res.json({ success: true, message: "Product added to cart", cart: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product to cart");
  }
})


app.get("/view/cart/:userId", async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .populate("cartData.product")
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, cart: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cart");
  }
})

// remove from cart
app.delete("/remove/cart/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.cartData = user.cartData.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    const updatedUser = await userModel
      .findById(userId)
      .populate("cartData.product");

    res.json({
      success: true,
      message: "Product removed from cart",
      cart: updatedUser.cartData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing product from cart");
  }
})

//order
// Place Order API
app.post("/place-order/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId).populate("cartData.product");
    if (!user) return res.status(404).send("User not found");

    if (user.cartData.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }
    user.orderdata.push(...user.cartData.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })))
    user.cartData = []
    await user.save()

    res.json({ success: true, message: "Order placed successfully", orders: user.orderdata })
  } catch (err) {
    console.error(err)
    res.status(500).send("Error placing order")
  }
})
// View Orders API
app.get("/view/orders/:userId", async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .populate("orderdata.product");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, orders: user.orderdata });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching orders");
  }
})
// Update Order Status API
app.put("/update-order/:userId/:orderId", async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const { status } = req.body;

    // validate
    if (!["Out For Delivery", "Completed"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const user = await userModel.findOneAndUpdate(
      { _id: userId, "orderdata._id": orderId },
      { $set: { "orderdata.$.status": status } },
      { new: true }
    ).populate("orderdata.product");

    if (!user) return res.status(404).json({ success: false, message: "User or Order not found" });

    res.json({ success: true, message: "Order status updated", orders: user.orderdata });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
})
// View All Orders (Admin)
app.get("/admin/orders", async (req, res) => {
  try {
    const users = await userModel
      .find()
      .populate("orderdata.product")
      .select("Username Email orderdata");

    // Flatten orders with user info
    const allOrders = [];
    users.forEach(user => {
      user.orderdata.forEach(order => {
        allOrders.push({
          orderId: order._id,
          product: order.product,
          quantity: order.quantity,
          status: order.status,
          userId: user._id,
          username: user.Username,
          email: user.Email
        });
      });
    });

    res.json({ success: true, orders: allOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching all orders" });
  }
})






//port setting
app.listen(3005,()=>{
    console.log("port is running")
})