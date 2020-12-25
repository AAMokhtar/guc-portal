var express = require("express");
var app = express();
const bodyParser = require("body-parser");

var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const assert = require("assert");
const properties = require("./properties");
const cronJobs = require("./src/CronJobs/scheduling");

//console colors
const chalk = require("chalk");
const green = chalk.bold.green;
const red = chalk.bold.red;

//routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var staffRouter = require("./src/routes/staff");
var generalRouter = require("./src/routes/general");
var hrRouter = require("./src/routes/hr");
var hodRouter = require("./src/routes/hod");
var staffRouter = require("./src/routes/staff");
var generalRouter = require("./src/routes/general");
var ccRouter = require("./src/routes/cc");
var ciRouter = require("./src/routes/ci");

var academicRouter = require("./src/routes/academic");
const auth = require("./src/routes/auth");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/general", generalRouter);
app.use("/hr", auth.authenticateAndAuthorise("HR"), hrRouter);

app.use(auth.authenticate);
app.use("/staff", staffRouter);
app.use("/course-coordinator", ccRouter);
app.use("/general", generalRouter);
app.use("/hod", hodRouter);
// app.use("/academic", academicRouter);
app.use("/ci", ciRouter);

//start monitoring cron jobs
cronJobs.nxtAtt.start();

//DB + server connection
require("./src/mongoose/util/connect&Initialize")(() => {
  app.listen(properties.PORT, (err) => {
    if (err)
      console.log(
        red("app failed to start " + "(PORT: " + properties.PORT + ")")
      );
    console.log(green("app is listening to port " + properties.PORT));
  });
});

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

module.exports = app;
