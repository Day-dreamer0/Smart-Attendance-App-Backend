const Attendance = require("../models/Attendance");
const User = require("../models/User");
require("dotenv").config();

exports.addAttendance = async(req,res) => {
    try {
        const id=req.user.id;
        // const employeeID = User.findById(id).employeeID;
        if (req.file==null) {
            return res.json({ 
                statusCode: 400, 
                message: "Image is not captured. Please capture it again!!"
            });
        }
        else
        {
            var coverImageURL = `http://${req.headers.host}/media/${req.file.filename}`;
            attendance = new Attendance({
                id: id,
                coverImage : coverImageURL,
            });
            await attendance.save();
            return res.json({ statusCode : 200, message : "Image Successfully Catpured!!"});
        }

    } catch (error) {
        console.log(error.message);
    }
}

exports.getAllAttendances = async(req, res) => {
    try {
        var attendances = await Attendance.find ({id:req.user.id});
        if(attendances.length>0)
            return res.json({ statusCode: 200, attendances: attendances });
        else
            return res.json({statusCode:400, message: "No attendance found!!!"});
    } catch (error) {
        console.log(error.message);
    }
}