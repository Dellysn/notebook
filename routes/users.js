var express = require("express");
var router = express.Router();
const {
  signupPage,
  createUser,
  loginPage,
  login,
  logout
} = require("../Controllers/userController");
const noteRouter = require("../Controllers/noteControllers");
const {
  ensureAuthentication
} = require("../Config/auth")
// const { validate, validatorRule } = require("../helpers/expressValidators");

router.get("/signup", signupPage);
router.post("/signup", createUser);
router.get("/signin", loginPage);
router.post("/signin", login);
router.get("/logout", logout);
router.get("/notes", ensureAuthentication, noteRouter.getAllNotes);
router.get("/notes/:id", ensureAuthentication, noteRouter.getNotesById);
router.delete("/notes/delete/:id", ensureAuthentication, noteRouter.deleteSingleNote);
router.get("/notes/edit/:id", ensureAuthentication, noteRouter.editSingleNote);
router.put("/notes/edit/:id", ensureAuthentication, noteRouter.editSingleNoteAndUpdate);

router.get("/write", ensureAuthentication, (req, res) => {
  res.render("form", {
    title: "write note here"
  });
});
router.post("/write", noteRouter.createNote);

module.exports = router;