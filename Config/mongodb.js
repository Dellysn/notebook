const mongoose = require("mongoose");
module.exports = {
  connect: function () {
    // const uri = "mongodb://localhost:27017/notebook";
    const uri = "mongodb://dellyson:dellyson1@ds241097.mlab.com:41097/notebook";

    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(function () {
        return true;
      })
      .catch(function (err) {
        throw new err();
      });
  },
};
