const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  signupPage: function (req, res, next) {
    res.render("register", {
      title: "Register"
    })

  },
  loginPage: function (req, res) {

    res.render("login", {
      title: "Sign In",
      message: req.flash("info")

    });
  },
  createUser: function (req, res) {
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
          msg: "user already exist try using another email"
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
              console.log(req.flash("success_msg", "you are now registered and can login"));
              res.redirect("/users/signin")
            }).catch(function (err) {
              console.error(err)
            })


          })
        })
      }
    }).catch(function (err) {
      console.error(err)
    })



  },
  login: function (req, res, next) {
    const passport = require("passport");

    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/signin",
      successFlash: "Welcome!",
      failureFlash: true
    })(req, res, next);
  },
  logout: function (req, res) {
    req.logout();
    req.flash("success_msg", "You are logged out successfully!");
    res.redirect('/users/signin')
  }
}