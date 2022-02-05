const multer = require("multer");
const path = require("path");
var Istorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var imageUpload = multer({ storage: Istorage });
let router = require("express").Router();
var Controller = require("../controllers/CategoryController");


router.route("/category").post(imageUpload.single("Image"), Controller.category);
router.route("/getcategory").get(Controller.getAllCategory);
router.route("/getcategorybyId/:id").get(Controller.CategoryById);

router.route("/updatecategory/:id").put(imageUpload.single("Image"),Controller.updateCategory);
router.route("/deletecategory/:id").delete(Controller.deleteCategory);

module.exports = router;
