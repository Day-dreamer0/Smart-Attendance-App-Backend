const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(process.env.mongoURI);
        console.log("Database Connected...");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports=connectDB;