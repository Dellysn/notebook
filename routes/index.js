var express = require("express");
var router = express.Router();


const User = require("../models/User");
/* GET home page. */
router.get("/", function (req, res, next) {
  // User.findOne({})
  // User.f
  res.render("index", {
    title: "Express",
    user: req.user

  });
});

module.exports = router;