var express = require("express");
var app = express();

var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const assert = require("assert");
const properties = require('./properties');
//console colors
const chalk = require('chalk');
const green = chalk.bold.green;
const red = chalk.bold.red;


//routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var staffRouter = require("./src/routes/staff");
var generalRouter = require('./src/routes/general');
var ccRouter = require('./src/routes/cc');

//routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/staff", staffRouter);
app.use("/course-coordinator", ccRouter);
app.use("/general", generalRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//DB connection
require('./src/mongoose/util/connect&Initialize')(() => {
  app.listen(properties.PORT, (err) => {
    if(err) console.log(red('app failed to start ' + '(PORT: '+ properties.PORT +')'));
    console.log(green('app is listening to port '+ properties.PORT));
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
