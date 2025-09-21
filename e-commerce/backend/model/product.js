const mongoose = require('mongoose')

var schema=mongoose.Schema({
    productname:{ type: String, required: true },
    description:{ type: String, required: true },
    price:{ type: String, required: true },
    image:{ type: String, required: true ,default:'' }
})

var productSpace=mongoose.model("product",schema)
module.exports=productSpace