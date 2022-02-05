const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema(
  {
    bannerAdd: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

var Banner = mongoose.model("banner", bannerSchema);
module.exports = Banner;
