const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signupPage = function (req, res, next) {
  res.render("register", {
    title: "Register",
  });
};
(exports.loginPage = function (req, res) {
  res.render("login", {
    title: "Sign In",
  });
}),
  (exports.createUser = function (req, res) {
    let { firstname, lastname, email, password, password2 } = req.body;

    let errors = [];

    if (!firstname || !lastname || !email || !password || !password2) {
      errors.push({
        msg: " All input fields are required",
      });
    }

    if (password.length < 5) {
      errors.push({
        msg: "password length should be more than 5 characters",
      });
    }
    if (password !== password2) {
      errors.push({
        msg: " passwords do not match",
      });
    }

    if (errors.length > 0) {
      res.status(422).render("register", {
        firstname,
        lastname,
        email,
        password,
        password2,
        errors,
      });
    } else {
      User.findOne({
        email: email,
      })
        .then((user) => {
          if (user) {
            errors.push({
              msg: "user already exist try using another email",
            });
            res.status(422).render("register", {
              firstname,
              lastname,
              email,
              password,
              password2,
              errors,
            });
          } else {
            let newUser = new User({
              firstname,
              lastname,
              email,
              password,
            });
            bcrypt.genSalt(10, function (err, salt) {
              if (err) {
                throw err;
              }
              bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(function (user) {
                    req.flash(
                      "success_msg",
                      "you are now registered and can login"
                    );
                    res.redirect("/users/signin");
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
              });
            });
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  });
exports.login = function (req, res, next) {
  const passport = require("passport");

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/signin",
    successFlash: "Welcome!",
    failureFlash: true,
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  req.flash("success_msg", "You are logged out successfully!");
  res.redirect("/users/signin");
};
