const express= require("express");
const connectDB = require("./utils/connectDB");
const app =express();
const path = require("path");

connectDB();

// Media Config
app.use("/media", express.static(path.join(__dirname,"/media")));

//Cors Config
app.use(require("cors")());

//Body Parsing Config
app.use(express.json({extended: true}));

//Routes Config
app.use("/api/user", require("./routes/user"));

// 404 Routes
app.all("*", async (req, res) => {
    try {
      res.json({ statusCode: 404, message: "Route not Found!" });
    } catch (error) {
      console.log(error.message);
    }
  });
  
  
  // PORT Config
  const PORT = process.env.PORT || 5000;
  
  // Server Connectivity
  app.listen(PORT, () => {
    console.log("Server Connected on PORT :", PORT);
  });