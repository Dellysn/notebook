const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
        usernameField: "email",
        session: true
      },
      function (email, password, done) {
        //    Find User by email
        let condition = {
          email: email
        };
        User.findOne(condition).then(function (user) {
          // check if its user
          if (!user) {
            return done(null, false, {
              message: "this user email is not registered"
            });
          }

          // use bcryptjs to compare
          bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "password is incorrect"
              });
            }
          });
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};