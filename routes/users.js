var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send("respond with a resource");
  res.redirect("/users/signup");
  next();
});
router.get("/signup", (req, res) => {
  res.render("register", {
    title: "Sign Up"
  });
});
router.get("/signin", (req, res) => {
  res.render("login", {
    title: "Sign in"
  });
});

module.exports = router;
