var express = require("express");
var router = express.Router();
const Notebook = require("../models/Note");
const {
  ensureAuthentication
} = require("../config/auth")
/* GET home page. */
router.get("/", ensureAuthentication, function (req, res, next) {
  Notebook.countDocuments({
    user: req.user._id
  }).then(function (docs) {
    res.render("index", {
      title: "NoteBook",
      user: req.user,
      docs

    });
  }).catch(function (err) {

    res.status(500).json({
      message: "an error occured",
      err: [err]
    });

  });

});

module.exports = router;