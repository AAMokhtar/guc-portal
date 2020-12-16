var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//------------------------------------------------------------------------
//                    MAYAR'S TRASH
//------------------------------------------------------------------------
/*
//mongoose to connect to database
const mongoose = require('mongoose');
//to encrypt and decrypt passwords
const bcrypt = require('bcyrptjs');
//required to store information about current user
const jst = require('jsonwebtoken');

//key used for jsonwebtoken
const jwtKey = "akjhfdkadsjhfdsjklalsdsfajhjkhsdfakjhfdsa";

//process request body as a JSON object
app.use(express.json());
//process request body as array/string
//extended set to false as we don't need to parse the extended syntax
app.use(express.urlencoded({extended:false}));

//mongoose connection parameters to fix deprecation warnings
const mongConnectionParams = 
{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopolgy: true
}

//TODO: enter mongoose connection here
//connects to mongoose database
const mongooseURL = "";
mongoose.connect(mongooseURL, mongConnectionParams)
  .then( () =>
    {
      console.log("Database is up and running");
    }
  ).catch( () =>
    {
      console.log("Database failed to connect")
    }
  );

//Authentication middeware
//Used to check if user has a jsonwebtoken (i.e. logged in)
const authenticate = (req, res, next) =>
    {
      const token = req.header('auth-token');
      if
    }

//login route
app.post('/login', async (req, res) =>
    {

    }
)
*/
//------------------------------------------------------------------------
//                    END OF MAYAR'S TRASH
//------------------------------------------------------------------------

module.exports = app;
