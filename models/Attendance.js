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
        type : String,
        // ist format date
        // default : moment.utc().add(330,'minutes').format("YYYY-MM-DD hh:mm a")
    }
})

module.exports = Attendance = mongoose.model("Attendance", AttendanceSchema);