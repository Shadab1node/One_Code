
const express = require("express");
const app = express();
const Category = require("../models/categoryModel");

// ADD CATEGORY

var url="https://project-2-monis.herokuapp.com/upload/Image"
exports.category = async (req, res) => {
  try {
    const profileImage = req.file ? req.file.filename : null;
    var category = new Category(req.body);
    category.Image = `${url}/${profileImage}`;

    category.save(function (err) {
      res.json({
        msg: "category add",
        data: category,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL CATEGORY

exports.getAllCategory = async (req, res) => {
  try {
    var allCategory = await Category.find({});
    return res.status(200).json(allCategory);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// GET CATEGORY BY ID


exports.CategoryById = async (req, res) => {
  try {
    const categorybyID = await Category.find({ _id: req.params.id });
    return res.status(200).json(categorybyID);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// UPDATE CATEGORY

exports.updateCategory = async (req, res) => {
  try {
    const Image=req.file.path
    const {category,name} = req.body;
    const update = await Category.findByIdAndUpdate(req.params.id, {
      category,
      name,
      Image:Image
    });
    return res.status(200).json(update);
  } catch (error) {
    console.log
    return res.status(500).json({ msg: error.message });
  }
};

// DELETE CATEGORY

exports.deleteCategory = async (req, res) => {
  try {
    const deletebyid = await Category.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletebyid);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
