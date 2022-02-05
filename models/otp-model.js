var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const otpSchema = new Schema(
  { 
    number:{
         type: String,
         },
         email:{
           type:String
         },
    otp:{
         type: String, 
         },
    tokens:{
          type: String,
        },
    createdAt: 
    { 
        type: Date, 
        default: Date.now,
         index: { expires: 5000 },
    },
},
    {
    timestamps: true,
  });

var Otp = mongoose.model("otp", otpSchema);
module.exports = Otp;
