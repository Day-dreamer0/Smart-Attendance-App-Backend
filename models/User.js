const mongoose = require("mongoose");
const moment = require("moment");

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
        type : String,
        default : moment.utc().add(330,'minutes').format("YYYY-MM-DD hh:mm a")
    },
})

module.exports = User = mongoose.model("User", UserSchema);