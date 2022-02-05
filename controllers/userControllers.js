const User=require("../models/userModel")
const Otp=require("../models/otp-model")
const bcrypt=require("bcrypt")
const twilio=require("twilio")
const sendSms = require('../twilio');
const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const nodemailer=require("nodemailer")

// CREATE TOKEN

    const createToken = (user) => {
            return jwt.sign({ user }, process.env.PROCESS_KEY, {
            expiresIn: "7d",
        });
    };
  

// ADD USER

    exports.adduser=async (req,res)=>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const user=new User(req.body);
            const phone=req.body.phone
            user.password=hash
            user.save()
            console.log(user)
            return res.status(200).json({msg:"user add successfully",user})
        }
            catch(error){
            console.log(error)
            return res.status(400).json({msg:"something went wrong",error:error.message})
        }
    }

// GET USER

    exports.getuser=async (req,res)=>{
        try {
            const getuser=await User.find({})
            return res.status(200).json({msg:"user get successfully",getuser})
        }
        catch(error){
            console.log(error)
            return res.status(400).json({msg:"something went wrong",error:error.message})
        }
    }

// UPDATE USER

    exports.updateuser=async (req,res)=>{
        try {
            const {fullname,phone,city,state,email,profession,DOB}=req.body
            const updateuser=await User.findByIdAndUpdate(req.params.id,{
            fullname,
            phone,
            city,
            state,
            email,
            profession,
            DOB
        })
            return res.status(200).json({msg:"user update successfully",updateuser})
        }
            catch(error){
            console.log(error)
            return res.status(400).json({msg:"something went wrong",error:error.message})
        }
    }

// DELETE USER

    exports.deleteuser=async (req,res)=>{
        try{
            const deleteuser=await User.findByIdAndDelete({_id:req.params.id})
            return res.status(200).json({msg:"user delete successfully",deleteuser})
        }
            catch(error){
            console.log(error)
            return res.status(400).json({msg:"something went wrong",error:error.message})
        }
    }

// LOGIN USER WITH OTP WITH NUMBER

    exports.sendotp=async (req,res)=>{
        try{
            const OTP = otpGenerator.generate(4, { digits: true }); 
            let user = await User.findOne({
            number: req.body.number
        })
      if(user){
            const otp=new Otp()
            otp.number=req.body.number
            otp.otp=OTP 
            const result = await otp.save();
        }
     else{
            res.status(400).json({msg:"user not found please first signup"})
    }
    //await user.save()
            const welcomeMessage =  `Your verification code is: ${OTP}`;
            console.log(welcomeMessage)
            const messageres = await sendSms(user.number, welcomeMessage);
            console.log(messageres)
            return res.status(201).send({
            message: 'Account created successfully, kindly check your phone to activate your account!',
            data: user,
        })
        }
        catch(error){
            console.log(error)
            return res.status(400).json({error:error.message})
        }
    }

    // VERIFY OTP AND LOGIN

    exports.verifyOtp = async (req, res) => {
        try{
            var{ number, otp } = req.body;
            let newotp = await Otp.findOne({ number: number, otp: otp });
        if(!newotp){
           return res.status(400).json({errors: 'wrong otp'})
        }
        if(newotp){
            var number = req.body.number;
            let user = await User.findOne({ number });
            console.log(user.number)
            const token = createToken(user);
            const OTPDelete = await Otp.deleteOne({
            number:number
        });
             return res.status(200).json({ msg: "user login successfully",user,token });
        }
        }catch(error){
            console.log(error)
            return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
        }
    }


    exports.mailsend = async (req, res) => {
            const { email } = req.body;
            if(email === "") {
                res.status(500).json({ msg: "Email is required" });
            }
            else
            {
              try{
                const checkUser = await User.findOne({ email });
            if(checkUser){
                const OTP = otpGenerator.generate(4, { digits: true, upperCaseAlphabets: false, specialChars: false });
                let otpData = new Otp({
                email,
                otp: OTP
            });
          
                let optResponse = await otpData.save();
                mailer(email, otpData.otp);
                return res.status(200).json({ msg: "OTP sended to your mail" });
            }else{
                return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
            }
            } 
            catch(error) 
            {
                console.log(error);
                return res.status(500).json({ errors: error });
            }
        }
    };
          
        const mailer = (email, otp) => {
            let mailTransporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port:587,
            auth:{
                user: "apikey",
                pass: "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",
            },
        });
            var mailOptions = {
            from: "node1flyweis@gmail.com",
            to: email,
            subject: "OTP mail",
            text: otp,
        };
            mailTransporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
            }
            else
            {
                console.log("Email sent: " + info.response);
            }
        });
    };

        exports.userlogin = async (req, res) => {
            const { email, password } = req.body;
            try {
              const admin = await User.findOne({ email });
              if (admin) {
                const matched = await bcrypt.compare(password, admin.password);
                if (matched) {
                  const token = createToken(admin);
                  return res
                    .status(200)
                    .json({ msg: "You have login successfully", token, admin });
                } else {
                  return res
                    .status(401)
                    .json({ errors: [{ msg: "Password is not correct" }] });
                }
              } else {
                return res.status(404).json({ errors: [{ msg: "Email not found" }] });
              }
            } catch (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
          };
          
          exports.forgotpassword = async (req, res) => {
            var { email, otp } = req.body;
            let code = await Otp.find({ email: email, otp: otp });
            if (code) {
              let currentTime = new Date().getTime();
              let diff = code.expireIn - currentTime;
              if (diff < 0) {
                return res.status(400).json({ errors: [{ msg: "Token expire" }] });
              } else {
                var email = req.body.email;
                let user = await User.findOne({ email });
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                user.password = hash;
        
                const OTPDelete = await Otp.deleteMany({
                  email:email
                })
                user.save();
                return res.status(200).json({ msg: "Password changes successfully" });
              }
            } else {
              return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
            }
          };