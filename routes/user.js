const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userAuth = require("../middleware/userAuth");
const uploadFile = require("../utils/uploadFile");


// @GET Route
router.get("/me",userAuth, userController.getLoggedInUserDetails);

//@PUT Route
// @DESC Of Update User
router.put(
    "/update", 
    userAuth,
    uploadFile.array("coverImage",5), 
    userController.updateInfo);

//@POST Route
// @DESC Of Create User
router.post("/register", userController.register);

// @POST Route
// @DESC User Login
router.post("/login", userController.login);


module.exports = router;