const express = require("express");
const cors = require("cors");
const BlogModel=require("./model")
require("./connection")
const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());
//Write missing code here

//Write your POST API here

app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
})
app.get("/view/:id", async (req, res) => {
  try {
    const card = await BlogModel.findById(req.params.id);
    res.json(card);
  } catch (err) {
    res.status(500).send("Error fetching card");
  }
})

app.post("/add",async(req,res)=>{
    await BlogModel(req.body).save()
    res.send('data added')
})
app.delete("/delete/:id",async(req, res)=>{
    await BlogModel.findByIdAndDelete(req.params.id)
    res.send("Data Deleted")})

    app.put("/update/:id",async(req,res)=>{
   await BlogModel.findByIdAndUpdate(req.params.id,req.body)
    res.send("data updated")
    })




app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});


