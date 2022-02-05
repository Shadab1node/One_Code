const multer = require("multer");
var path=require("path")
var url="https://project-2-monis.herokuapp.com"
var bannerAdd = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var bannerAdd = multer({ storage: bannerAdd });
let router = require("express").Router();
var Controller = require("../controllers/bannerController");

// BANNER ROUTES

router.route("/bannerAdd").post(bannerAdd.single("bannerAdd"), Controller.bannerAdd);
router.route("/getbanner").get(Controller.view);
router.route("/bannerUpdatebyId/:id").put(bannerAdd.single("bannerAdd"), Controller.updatebanner);
router.route("/bannerdeletebyId/:id").delete(Controller.deletebanner);

module.exports = router;
