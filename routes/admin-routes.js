let router = require("express").Router();
var Controller = require("../controllers/adminController");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/adminvalidator');

// ADMIN ROUTES

router.route("/adminlogin").post(validateSignupRequest, isRequestValidated,Controller.adminlogin);
router.route("/adminmailsend").post(isRequestValidated, validateSigninRequest,Controller.adminmailsend);
router.route("/adminforgotpassword").post(Controller.adminforgotpassword);


module.exports = router;
