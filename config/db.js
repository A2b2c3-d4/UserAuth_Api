const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Connected to mongoDB Server")
    }
    catch{
         console.log("MongoDB disconnected");
    }
}

module.exports = connectDB;