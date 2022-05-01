const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    employeeID: {
        type : String,
    },
    coverImages: {
        type: [String],
        // default : ""
    },
    email : {
        type: String,
    },
    password : {
        type: String,
    },
    phone : {
        type: Number,
    },
    dateOfJoining : {
        type: Date,
    },
    dateOfBirth: {
        type : Date,
    },
    createdDate : {
        type : Date,
        default : Date.now()
    },
})

module.exports = User = mongoose.model("User", UserSchema);