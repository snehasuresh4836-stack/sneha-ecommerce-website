const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect("mongodb+srv://snehasuresh4836:sneha@cluster0.rummaq9.mongodb.net/ideal?retryWrites=true&w=majority&appName=Cluster0"
   
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
