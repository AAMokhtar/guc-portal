var express = require("express");
var app = express();
var cors = require("cors");
const properties = require("./properties");

const bodyParser = require("body-parser");

var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cronJobs = require("./src/CronJobs/scheduling");

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

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  exposedHeaders: "auth-token",
};

app.use(cors(corsOptions));

//routes
app.use("/general", generalRouter);
app.use("/hr", auth.authenticateAndAuthorise("HR"), hrRouter);

app.use("/staff", auth.authenticate, staffRouter);
app.use("/course-coordinator", auth.authenticate, ccRouter);
app.use("/general", auth.authenticate, generalRouter);
app.use("/hod", auth.authenticate, hodRouter);
app.use("/academic", auth.authenticate, academicRouter);
app.use("/ci", auth.authenticate, ciRouter);

//start monitoring cron jobs
cronJobs.nxtAtt.start();
cronJobs.lb.start();
cronJobs.deduction.start();

app.use(express.static(path.join(__dirname, "..", "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

//DB + server connection
require("../server")(() => {
  app.listen(properties.PORT, (err) => {
    if (err)
      console.log(
        red("app failed to start " + "(PORT: " + properties.PORT + ")")
      );
    console.log(
      green("CORS-enabled web server is listening to port " + properties.PORT)
    );
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
  res.json(err);
});

module.exports = app;
