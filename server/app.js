var express = require("express");
var app = express();
var cors = require("cors");

const bodyParser = require("body-parser");

var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const assert = require("assert");
const properties = require("./properties");
const cronJobs = require("./src/cronJobs/scheduling");

//console colors
const chalk = require("chalk");
const green = chalk.bold.green;
const red = chalk.bold.red;

//routers
var staffRouter = require("../routes/staff");
var generalRouter = require("../routes/general");
var hrRouter = require("../routes/hr");
var hodRouter = require("../routes/hod");
var staffRouter = require("../routes/staff");
var generalRouter = require("../routes/general");
var ccRouter = require("../routes/cc");
var ciRouter = require("../routes/ci");

var academicRouter = require("../routes/academic");
const auth = require("../routes/auth");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  exposedHeaders: "auth-token",
};

app.use(cors(corsOptions));

//routes
app.use("/general", generalRouter);
app.use("/hr", auth.authenticateAndAuthorise("HR"), hrRouter);

app.use(auth.authenticate);
app.use("/staff", staffRouter);
app.use("/course-coordinator", ccRouter);
app.use("/general", generalRouter);
app.use("/hod", hodRouter);
app.use("/academic", academicRouter);
app.use("/ci", ciRouter);

//start monitoring cron jobs
cronJobs.nxtAtt.start();
cronJobs.lb.start();
cronJobs.deduction.start();

//DB + server connection
require("../server");

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

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../frontend/build")));

module.exports = app;
