const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let noteSchema = Schema({
  title: {
    type: String,
    required: true
  },
  noteBody: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Note", noteSchema);