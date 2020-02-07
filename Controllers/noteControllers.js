const Notebook = require("../models/Note");
exports.createNote = async function (req, res) {
  let notes = {
    title: req.body.title,
    noteBody: req.body.noteBody,
    user: req.user.id
  };

  let newNote = new Notebook(notes);
  await newNote
    .save()
    .then(function (result) {
      req.flash("success_msg", "note added successfully");
      res.redirect("/users/notes");
    })
    .catch(function (err) {
      console.error(err);
    });
};
exports.getAllNotes = function (req, res) {
  Notebook.find({
    user: req.user.id
  }).then(function (notes) {

    res.render("notes", {
      notes,
      title: "Notes"
    });
  });
};
exports.getNotesById = function (req, res) {
  let condition = {
    _id: req.params.id
  }
  Notebook.find(condition).then(function (note) {
    console.log(note)
    res.render("note", {
      note
    })
  })



}