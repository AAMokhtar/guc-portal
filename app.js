var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const assert = require("assert");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//------------------------------------------------------------------------
//                    MAYAR'S TRASH
//------------------------------------------------------------------------

//mongoose to connect to database
const mongoose = require("mongoose");


//mongoose connection parameters to fix deprecation warnings
const mongConnectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

//TODO: enter mongoose connection here
//connects to mongoose database
const mongooseURL = "";
mongoose
  .connect(mongooseURL, mongConnectionParams)
  .then(() => {
    console.log("Database is up and running");
  })
  .catch(() => {
    console.log("Database failed to connect");
  });


//------------------------------------------------------------------------
//                    END OF MAYAR'S TRASH
//------------------------------------------------------------------------

module.exports = app;
