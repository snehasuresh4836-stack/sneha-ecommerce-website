const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const OrdersSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, default: 1, min: 1 },
    status: { type: String, enum: ["Pending", "Out For Delivery", "Completed", "Cancelled"], default: "Pending" }

  },
  { _id: false }
);


var schema = mongoose.Schema({
    Username: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    cartData: [CartItemSchema],
    orderdata:[OrdersSchema],
    userType: { type: String, enum: ["admin", "user"], default: "user" },
});

var user = mongoose.model("user", schema)
module.exports = user
