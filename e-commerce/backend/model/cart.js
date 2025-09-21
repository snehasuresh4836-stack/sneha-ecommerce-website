const mongoose = require('mongoose')

var schema=mongoose.Schema({
    productname:String,
    description:String,
    price:String,
    image:String
})

var cartSpace=mongoose.model("cart",schema)
module.exports=cartSpace