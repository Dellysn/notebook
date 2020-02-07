module.exports = {
    ensureAuthentication: function (req, res, next) {
        if (!req.isAuthenticated()) {
            req.flash("error_msg", "you are not authorized");
            res.redirect("/users/signin");


        } else {
            return next();
        }
    }
}