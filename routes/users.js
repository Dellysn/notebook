var express = require("express");
var router = express.Router();
const userController = require("../Controllers/userController");
const noteRouter = require("../Controllers/noteControllers");
// const { validate, validatorRule } = require("../helpers/expressValidators");

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send("respond with a resource");
  res.redirect("/users/signup");
  next();
});
router.get("/signup", (req, res) => {
  req.flash({
    message: "Welcome"
  });
  res.render("register", {
    title: "Sign Up"
  });
});
router.post("/signup", userController.createUser);
router.get("/signin", (req, res) => {
  res.render("login", {
    title: "Sign in"
  });
});
router.get("/write", (req, res) => {
  res.render("form", {
    title: "write note here"
  });
});
router.post("/write", noteRouter.createNote);

module.exports = router;
