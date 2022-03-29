const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const userAuth = require("../middleware/userAuth");
const uploadFile = require("../utils/uploadFile");

// @GET Route1
// @DESC Get all Attendance
// router.get("/all", userAuth,attendanceController.getAllAttendances);


// @POST Route
// @DESC Add Attendance
router.post(
    "/add",
    userAuth,
    uploadFile.single("coverImage"),
    attendanceController.addAttendance
  );

// @GET Route
// @DESC GET Attendance by Date
// router.put(
//     "/update/:date",
//     userAuth,
//     attendanceController.getAttendanceByDate
//   );

module.exports = router;