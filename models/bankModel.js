const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankSchema = new Schema(
  { 
    accHolderName:{
        type:String
    },
    
    bankname:{
        type:String
    },
    
    ifsccode:{
        type:String
    },
    
    accnumber:{
        type:String
    },
    
    confirmaccnumber:{
        type:String
    },
  }, 
  {
    timestamps: true,
  }
);


var Bank = mongoose.model("bank", bankSchema);
module.exports = Bank;
