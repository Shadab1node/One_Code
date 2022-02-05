let router = require("express").Router();
var Controller = require("../controllers/bankController");

// BANK ROUTES

router.route("/addbank").post(Controller.addbank);
router.route("/getbank").get(Controller.getbank);

module.exports = router;
