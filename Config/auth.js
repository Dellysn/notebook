module.exports = {
    ensureAuthentication: function (req, res, next) {
        if (!req.isAuthenticated()) {
            req.flash("error_msg", "you are not authorized, You have to login!");
            res.redirect("/users/signin");


        } else {
            return next();
        }
    }
}