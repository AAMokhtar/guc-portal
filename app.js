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

//mongoose to connect to database
const mongoose = require('mongoose');
//to encrypt and decrypt passwords
const bcrypt = require('bcyrptjs');
//required to store information about current user
const jst = require('jsonwebtoken');
const { nextTick } = require('process');

//TODO: save it in an env file?
//key used for jsonwebtoken
const jwtKey = "akjhfdkadsjhfdsjklalsdsfajhjkhsdfakjhfdsa";

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
//Used to check if user has a valid jsonwebtoken (i.e. logged in)
function authenticate(req, res, next)
{
  //get the user's token
  const token = req.header('auth-token');
  //if there is no token
  if(!token)
  {
    return res.status(403).json({msg: "You need to login first to access this page."});
  }

  try
  {
    //verify that the signature is legitimate using the jwt key
    const verified = jwt.verify(token, key);
    req.user = verified; //sends the payload to a request attribute named user
    next(); //call the next function
  }
  catch(error) //catches an error should the token fail the verification
  {
    return res.status(500).json({msg: error.message});
  }
}

//Authentication and authorisation middleware
//Checks if user has a valid token and is course coordinator
function authenticateAndAuthoriseCC(req, res, next)
{
  //get user's token
  const token = req.header('auth-token');
  //if there is no token
  if(!token)
  {
    return res.status(403).json({msg: "You need to login to access this page"});
  }

  try
  {
    //verify the signature of the token is legitimate using the key
    const verified = jwt.verify(token, key);
    req.user = verified; //sends the payload to a request attribute named user

    //gets the user's role in the university
    const role = verified.role;
    if(role === "Course Coordinator")
    {
      //if current user is a course coordinator, continue executing the next function
      next();
    }
    else
    {
      res.status(401).json({msg: "Unauthorized to access this page."});
    }
  }
  catch(error) //catches error thrown should token fail verification
  {
    return res.status(500).json({msg: error.message});
  }
}

//login route
app.post('/login', async (req, res) =>
    {
      try
      {
        const {email,password} = req.body;

        //if user didn't enter email or password
        if(!email || !password)
        {
          return res.status(400).json({msg: "Please enter both email and passowrd"});
        }
      }
      catch(error)
      {
        res.status(500).json({msg: error.message});
      }
    }
);

//------------------------------------------------------------------------
//                    END OF MAYAR'S TRASH
//------------------------------------------------------------------------

module.exports = app;
