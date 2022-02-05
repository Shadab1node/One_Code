require('dotenv').config();
let express = require("express");
const twilio = require('twilio');
require("./config/database")
const cors = require("cors");
let app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ALL ROUTES

let userRoutes = require("./routes/user-routes");
let adminRoutes=require("./routes/admin-routes")
let bannerRoutes = require("./routes/banner-routes");
let categoryRoutes=require("./routes/category-routes")
let bankRoutes=require("./routes/bank-routes")

var port = process.env.PORT || 3999;
app.use("/api",userRoutes,adminRoutes,bannerRoutes,categoryRoutes,bankRoutes)

app.listen(port, function () {console.log("Running on port " + port)});
module.exports = app;
