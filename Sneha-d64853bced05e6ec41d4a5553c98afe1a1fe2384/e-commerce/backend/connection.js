const Mongoose= require("mongoose")
Mongoose.connect("mongodb+srv://snehasuresh4836:sneha@cluster0.rummaq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() =>console.log("connected"))
.catch((err)=>console.log(err))
