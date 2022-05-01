const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    id :{ 
        type : String,
    },
    employeeID : {
        type : String,
    },
    coverImage : {
        type : String,
    },
    createdDate : {
        type : Date,
        default : Date.now()
    }
})

module.exports = Attendance = mongoose.model("Attendance", AttendanceSchema);