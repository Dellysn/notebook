const { check, validationResult } = require("express-validator");

module.exports = {
  validatorRule: function() {
    return [
      check("firstname")
        .not()
        .isEmpty()
        .withMessage("firstname is required"),
      check("lastname", "lastname is required")
        .not()
        .isEmpty(),
      check("email", "Email is required")
        .not()
        .isEmpty(),
      check("email", "Email is required")
        .isEmail()
        .normalizeEmail()
        .withMessage("use a valid email address"),
      check("password", "Your password must be at least 5 characters")
        .not()
        .isEmpty()
    ];
  },
  validate: function(req, res, next) {
    const errors = validationResult(req);

    const errorReturned = [];
    if (!errors.isEmpty()) {
      errors.array().map(function(err) {
        errorReturned.push({
          [err.param]: err.msg
        });
      });
      return res.status(422).json({
        errors: errorReturned
      });
    } else {
      return next();
    }
  }
};
