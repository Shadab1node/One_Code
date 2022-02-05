const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const Banner = require("../models/bannerModel");

// ADD BANNER

var url="https://project-2-monis.herokuapp.com/upload/Image"
exports.bannerAdd = async (req, res) => {
  try {
    const bannerImage = req.file ? req.file.filename : null;
    var banner = new Banner();
    banner.bannerAdd = `${url}/${bannerImage}`;
    banner.save(function (err) {
      if(err){
        console.log(err)
        return res.status(500).json({
          msg: err.msg
        })
      }
      return res.json({
        message: "banner add Successfully",
        data: banner,
      });
    });
  } catch (error) {
    res.json({
      message: "Error find in when adding the banner",
    });
  }
};

// VIEW BANNER

exports.view = async (req, res) => {
  try {
    const viewAllUser = await Banner.find({});
    return res.status(200).json(viewAllUser);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// UPDATE BANNER

exports.updatebanner = async (req, res) => {
  const bannerAdd = req.file.path;
  try {
    const update = await Banner.findByIdAndUpdate(req.params.id, {
      bannerAdd,
    });
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// DELETE BANNER

exports.deletebanner = async (req, res) => {
  try {
    const deletebyid = await Banner.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletebyid);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
