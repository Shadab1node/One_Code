let router = require("express").Router();
const Controller = require("../controllers/userControllers");

// ROUTE FOR USER

router.route("/adduser").post(Controller.adduser);
router.route("/getuser").get(Controller.getuser);
router.route("/updateuser/:id").put(Controller.updateuser);
router.route("/deleteuser/:id").delete(Controller.deleteuser);
router.route("/sendotp").post(Controller.sendotp);
router.route("/verifyOtp").post(Controller.verifyOtp)
router.route("/userlogin").post(Controller.userlogin);
router.route("/mailsend").post(Controller.mailsend);
router.route("/forgotpassword").post(Controller.forgotpassword);

module.exports = router;
