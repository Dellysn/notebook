var express = require("express");
var router = express.Router();
const {
  signupPage,
  createUser,
  loginPage,
  login
} = require("../Controllers/userController");
const noteRouter = require("../Controllers/noteControllers");
// const { validate, validatorRule } = require("../helpers/expressValidators");

router.get("/signup", signupPage);
router.post("/signup", createUser);
router.get("/signin", loginPage);
router.post("/signin", login);
router.get("/write", (req, res) => {
  res.render("form", {
    title: "write note here"
  });
});
router.post("/write", noteRouter.createNote);

module.exports = router;