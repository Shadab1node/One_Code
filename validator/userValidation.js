const {check, validationResult } = require('express-validator');

// VALIDATION FOR USER SIGNUP

exports.validateSignupRequest =[
   check('name')
   .notEmpty()
   .withMessage("username Is Required"),
   check('email')
   .isEmail()
   .withMessage("Please Enter a valid Email"),
   check("number")
   .isLength({ min: 10 })
   .withMessage("Please Enter a Valid number"),
   check("password")
   .isLength({ min:6 })
   .withMessage("Password must be at least 6 character long")
];

// VALIDATION FOR SIGNUP

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

// VALIDATION FOR IS REQUEST VALID OR NOT

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}