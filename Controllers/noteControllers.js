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
exports.getAllNotes = async function (req, res) {
  await Notebook.find({
    user: req.user.id
  }).then(function (notes) {
    if (notes) {
      Notebook.countDocuments({
        user: req.user.id
      }).then(function (docs) {
        res.render("notes", {
          notes,
          docs,
          title: "Notes"
        });

      })
    }

  }).catch(function (err) {
    throw err;
  })
};
exports.getNotesById = async function (req, res) {
  let condition = {
    _id: req.params.id
  };
  await Notebook.find(condition).then(function (note) {
    if (note) {
      Notebook.countDocuments({
        user: req.user.id
      }).then(function (docs) {
        res.render("note", {
          note,
          docs,
          title: "Note::Reading"
        });

      })
    }

  }).catch(function (err) {
    throw err;
  });
};

exports.deleteSingleNote = async function (req, res) {

  let condition = {
    _id: req.params.id
  }
  await Notebook.findOneAndRemove(condition).then(function (result) {
    req.flash("success_msg", "Note successfully deleted!");
    res.redirect("/users/notes");
  }).catch(function (err) {
    console.log(err)
  })
}

exports.editSingleNote = async function (req, res) {
  let condition = {
    _id: req.params.id
  }
  await Notebook.findOne(condition).then(function (note) {
    res.status(200).render("edit-note", {
      title: "Edit Note",
      note

    })

  }).catch(function (err) {
    console.log(err)
  })
}

exports.editSingleNoteAndUpdate = function (req, res) {
  let condition = {
    _id: req.params.id
  }
  Notebook.findOne(condition).then(function (note) {
    let {
      title,
      noteBody
    } = req.body;
    note.title = title;
    note.noteBody = noteBody;
    note.save().then(function (result) {
      if (result) {
        req.flash("success_msg", "note updated successfully!");
        res.redirect("/users/notes/" + req.params.id);
      }
    }).catch(function (err) {
      if (err) {
        req.flash("error_msg", "There is trouble updating  your note, please try again!");
        res.redirect("/users/notes/" + req.params.id);
        throw err;
      }
    })



  })

}