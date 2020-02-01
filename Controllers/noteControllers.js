const Notebook = require("../models/Note");
exports.createNote = async function (req, res) {
  let notes = {
    title: req.body.title,
    noteBody: req.body.noteBody
  };

  let newNote = new Notebook(notes);
  await newNote
    .save()
    .then(function (result) {
      res.redirect("/users/write");
      res.status(200).json({
        result
      });
    })
    .catch(function (err) {
      console.error(err);
    });


};