const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport")
const app = express();
mongoose.Promise = global.Promise;

// PASSPORT CONFIGURATIONS
require("./Config/passport")(passport)


// connect MongoDB
const mongodb = require("./Config/mongodb");
mongodb.connect();


// view engine setup
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  })
);

app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

// BodyParser Middleware
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// Load routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// connect-flash middleware
app.use(flash());
// Express sessions
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true
    }
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//  Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});


// Static files
app.use(express.static(path.join(__dirname, "public")));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   // res.status(err.status || 500);
//   // res.render("error");

// });


// Using Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
module.exports = app;