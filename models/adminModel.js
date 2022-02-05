var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var adminSchema = new Schema(
  {
    email:{
        type:String
    },
    password: {
      type: String,
    },
    tokens: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
