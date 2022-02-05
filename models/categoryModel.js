
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    category: { type: String },
    name:{type:String},
    Image: { type: String },
  },
  {
    timestamps: true,
  }
);

var Category = mongoose.model("category", categorySchema);
module.exports = Category;
