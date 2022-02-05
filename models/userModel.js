const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  { 
    fullname:{
        type:String
    },
    
    number:{
        type:String
    },
    
    email:{
        type:String
    },
    
    state:{
        type:String
    },
    
    city:{
        type:String
    },
    
    password:{
        type:String
    },
    profession:{
        enum:["student","salaried","bussinessman"]
    },
    DOB:{
        type:String
    }
  }, 
  {
    timestamps: true,
  }
);


var User = mongoose.model("user", userSchema);
module.exports = User;
