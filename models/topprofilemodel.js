const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    profileimage: {
      type: String,
    },
    profilename:{
      type:String
    }
  },

  {
    timestamps: true,
  }
);

var Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
