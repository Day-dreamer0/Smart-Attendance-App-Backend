const Attendance = require("../models/Attendance");
const User = require("../models/User");
var FormData = require('form-data');
var fs = require('fs');
const axios = require('axios');
require("dotenv").config();
const path = require('path');

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
            const images = await User.findById(req.user.id,{coverImages:1});
            // console.log('images',images);
            const body = new FormData();
            // body.append('images', []);

            // you have to put the images in the same field, and the server will recibe an array
            // images.coverImages.forEach(img => body.append('images[]',fs.createReadStream(img)));
            images.coverImages.forEach(img => body.append('images[]',fs.createReadStream(img)));
            // images.coverImages.forEach(img => console.log(fs.createReadStream(img)));
            // console.log("body = ",body);
            // body.images.push(fs.createReadStream(img)
            // {
            //     uri:img,
            //     type:'image/jpeg',
            //     // name:req.file.filename
            // }
            // the other data to send
            // var coverImageURL = `http://${req.headers.host}/media/${req.file.filename}`;
            var coverImageURL = `media/${req.file.filename}`;
            // console.log(coverImageURL)
            body.append('test',fs.createReadStream(coverImageURL));
            // console.log(fs.createReadStream(coverImageURL));
            // {
            //     uri:coverImageURL,
            //     // type:path.extname(req.file.originalname)
            //     type:'image/jpeg',
            //     name:req.file.filename
            // }
            // console.log('1..body',body);
            attendance = new Attendance({
                id: id,
                coverImage : coverImageURL,
            });
            // console.log("attendance =", attendance);
            // return res.json({statusCode:400, message: "Code ends"});
            var url='http://daydreamer05.pythonanywhere.com/upload';
            
            var check=await axios.post(url, body);
            // console.log(check)
            // console.log(check.data)
            if(check.data.statusCode==200)
            {
                await attendance.save();
                return res.json({ statusCode : 200, attendance : attendance});
            }
            else
                return res.json({statusCode:400, message: check.data.message});
        }

    } catch (error) {
        console.log(error.message);
    }
}
exports.getAllAttendances = async(req, res) => {
    try {
        var attendances = await Attendance.find ({id:req.user.id}).select("-coverImage");
        if(attendances.length>0)
            return res.json({ statusCode: 200, attendances: attendances });
        else
            return res.json({statusCode:200, attendances: []});
    } catch (error) {
        console.log(error.message);
    }
}