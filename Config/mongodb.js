const mongoose = require("mongoose");
module.exports = {
  connect: function() {
    const uri = "mongodb://localhost:27017/notebook";
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(function() {
        console.log("MongoDB Connected Successfully");
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};
