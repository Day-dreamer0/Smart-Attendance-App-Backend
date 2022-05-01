const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    // console.log(phone);
    // Check if it is Null
    if (name == "" || name == null) {
      return res.json({ statusCode: 400, message: "Field Name is Empty!" });
    }

    if (email == "" || email == null) {
      return res.json({ statusCode: 400, message: "Field email is Empty!" });
    }

    if (password == "" || password == null) {
      return res.json({ statusCode: 400, message: "Field password is Empty!" });
    }

    if (!email.includes("@")) {
      return res.json({ statusCode: 400, message: "Email is not Valid!" });
    }

    if (password.length < 8) {
      return res.json({
        statusCode: 400,
        message: "Password must be greater than 8 characters!",
      });
    }

    // if (phone == null) {
    //   return res.json({ statusCode: 400, message: "Field phone is Empty!" });
    // }

    // Check if User Exists in DB
    var user = await User.findOne({ email });
    if (email != undefined && user != null) {
      return res.json({ statusCode: 400, message: "User's Email Already Exists!" });
    }

    user = await User.findOne({ phone });
    if (phone != undefined && user != null) {
      return res.json({ statusCode: 400, message: "User's Number already Exists!" });
    }

    // User Creation
    user = new User({
      name: name,
      email: email,
      password: password,
      // phone: phone,
    });

    // Password Encryption
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Token Generation
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          statusCode: 200,
          message: "User Successfully Registered!",
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    var user;
    let authVariable = email ?? phone;
    let check=parseInt(authVariable);
    let type=null;
    // Check if it is Null
    if (isNaN(check)) {
      user = await User.findOne({ email: authVariable });
      type="string";
    } else if(typeof check == "number") {
      user = await User.findOne({ phone: parseInt(authVariable) });
      type="number";
    }
    if(type==null)
    {
      return res.json({statusCode:400, message:"Email/Phone field is empty!!"});
    }

    if(type=="string")
    {
      if (!email.includes("@")) {
        return res.json({ statusCode: 400, message: "Email is not Valid!" });
      }
    }

    if (password == "" || password == null) {
      return res.json({ statusCode: 400, message: "Field password is Empty!" });
    }

    // Check if user exists
    if (user == null) {
      return res.json({ statusCode: 400, message: "User doesn't exists!" });
    }

    // Password Checking
    var isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ statusCode: 400, message: "Password is Incorrect!" });
    }

    // Token Generation
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          statusCode: 200,
          message: "User Authorized!",
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.getLoggedInUserDetails = async (req, res) => {
  try {
    var user = await User.findById(req.user.id).select("-password");
    return res.json({ statusCode: 200, user: user });
  } catch (error) {
    console.log(error.message);
  }
};

// exports.updateInitial = async(req,res) => {
//   try {
//     var user = await User.findById(req.user.id);
//     var {employeeID, coverImages, dateOfJoining, dateOfBirth}
//   } catch (error) {
//     console.log(error.message);
//   }
// }

exports.updateInfo = async(req, res) => {
  try {
    var user = await User.findById(req.user.id);
    // var {name, email, password, phone} = req.body;
    // var emailcount=0, emailid=null;
    // var phoneCursor = await User.find({ phone });
    // if (email != undefined && email!= null && user != null) {
    //   var emailCursor = await User.find({ email });
    //   emailCursor.forEach(emailexists = (emailuser) =>{
    //     if(emailuser.email== user.email)
    //     {
    //       count++;
    //       emailid=emailuser._id;
    //     }
    //   })
    //   if(count>1 || (count==1 && emailid == req.user.id))
    //   return res.json({ statusCode: 400, message: "User's Email Already Exists!" });
    // }
    // if (phone != undefined && phone!= null && user != null) {
    //   return res.json({ statusCode: 400, message: "User's Number already Exists!" });
    // }
    // if(name != null && name!="" && user.name!=name)
    // {
    //   user.name=name;
    // }
    // if(email != null && email!="" && user.email!=email)
    // {
    //   if (!email.includes("@")) {
    //     return res.json({ statusCode: 400, message: "Email is not Valid!" });
    //   }
    //   user.email=email;
    // }
    // if(phone != null && phone!="" && user.phone!=phone)
    // {
    //   user.phone=phone;
    // }
    // if(password != null && password!="" && user.password!=password)
    // {
    //   if (password.length < 8) {
    //     return res.json({
    //       statusCode: 400,
    //       message: "Password must be greater than 8 characters!",
    //     });
    //   }
    //   user.password=password;
    // }
    var coverImages = [];
    if (req.files.length > 5 || req.files.length <5) {
      return res.json({
        statusCode: 400,
        message: "You can add only 5 images!!",
      });
    }
    if(req.files.length==5)
    {
      for (var i = 0; i < req.files.length; i++) {
        var coverImageURL = `media/${req.files[i].filename}`;
        // var coverImageURL = `http://${req.headers.host}/media/${req.files[i].filename}`;
        coverImages.push(coverImageURL);
      }
      user.coverImages=coverImages;
      await user.save();
      return res.json({statusCode:200, user: user});
    }

    // if(name!=null || phone !=null || password != null || email != null)
    // {
      
    // }
    else
    {
      return res.json({statusCode:400, message: "Correct Information is not given!! "});
    }
  } catch (error) {
    console.log(error.message);
  }
}