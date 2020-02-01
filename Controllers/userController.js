const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = function (req, res) {
  let {
    firstname,
    lastname,
    email,
    password,
    password2
  } = req.body;


  let errors = [];

  if (!firstname || !lastname || !email || !password || !password2) {
    errors.push({
      msg: " All input fields are required"
    })
  }
  if (password !== password2) {
    errors.push({
      msg: " passwords do not match"
    })
  }
  if (password.length < 5) {
    errors.push({
      msg: "password length should be more than 5 characters"
    })

  }
  if (errors.length > 0) {
    res.render("register", {
      firstname,
      lastname,
      email,
      password,
      password2,
      errors
    })
  }

  User.find({
    email: req.body.email
  }).then(user => {
    if (user.length > 0) {
      errors.push({
        msg: "user already exist try using a unique email"
      })
      res.render("register", {
        firstname,
        lastname,
        email,
        password,
        password2,
        errors
      })
    } else {
      let newUser = new User({
        firstname,
        lastname,
        email,
        password
      })
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          throw err
        }
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(function (user) {
            req.flash("success_message", "you are now registered and can login");
            res.redirect("/users/signin")
          }).catch(function (err) {
            console.error(err)
          })


        })
      })



    }
  }).catch(err => {
    console.error(err)
  })



};
exports.login = function (req, res) {
  res.send("Login request recieved");
};