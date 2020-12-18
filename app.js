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

//routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/staff", staffRouter);

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


//------------------------------------------------------------------------
//                    MAYAR'S TRASH
//------------------------------------------------------------------------

//mongoose to connect to database
const mongoose = require("mongoose");
//to encrypt and decrypt passwords
const bcrypt = require("bcryptjs");
//required to store information about current user
const jst = require("jsonwebtoken");
const { nextTick } = require("process");

//------------------------------------------------------MODELS----------------------------------------

const Staff = require("./src/mongoose/dao/staff.js");
const Request = require("./src/mongoose/dao/request.js");
const LinkingSlot = require("./src/mongoose/dao/linkingSlot.js");
const Leave = require("./src/mongoose/dao/leave.js");
const DayOff = require("./src/mongoose/dao/dayOff.js");
const Replacement = require("./src/mongoose/dao/replacement.js");

//-----------------------------------------------------END OF MODELS----------------------------------

//TODO: save it in an env file? already did!
//key used for jsonwebtoken
const jwtKey = properties.JWT_KEY;


//-------------------------------------------------AUTHENTICATORS, VALIDATORS AND AUTHORIZATIONS--------------------------------------------------------

//TODO: test
//function that validates string as one following the email format
function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

//Authentication middeware
//Used to check if user has a valid jsonwebtoken (i.e. logged in)
function authenticate(req, res, next) {
  //get the user's token
  const token = req.header("auth-token");
  //if there is no token
  if (!token) {
    return res
      .status(403)
      .json({ msg: "You need to login first to access this page." });
  }

  try {
    //verify that the signature is legitimate using the jwt key
    const verified = jwt.verify(token, key);
    req.user = verified; //sends the payload to a request attribute named user
    next(); //call the next function
  } catch (
    error //catches an error should the token fail the verification
  ) {
    return res.status(500).json({ msg: error.message });
  }
}

//Authentication and authorisation middleware
//Checks if user has a valid token and is course coordinator
function authenticateAndAuthoriseCC(req, res, next) {
  //get user's token
  const token = req.header("auth-token");
  //if there is no token
  if (!token) {
    return res
      .status(403)
      .json({ msg: "You need to login to access this page" });
  }

  try {
    //verify the signature of the token is legitimate using the key
    const verified = jwt.verify(token, key);
    req.user = verified; //sends the payload to a request attribute named user

    //gets the user's role in the university
    const role = verified.role;
    if (role === "Course Coordinator") {
      //if current user is a course coordinator, continue executing the next function
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized to access this page." });
    }
  } catch (
    error //catches error thrown should token fail verification
  ) {
    return res.status(500).json({ msg: error.message });
  }
}

//-----------------------------------------------------------END OF AUTHENTICATORS, VALIDATORS AND AUTHORISATION------------------------

//login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //if user didn't enter email or password
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please enter both email and passowrd" });
    }

    //if email entered is not valid
    if (!emailValidator(email)) {
      return res
        .status(400)
        .json({ msg: "Please enter a valid email address" });
    }

    //TODO: validate password

    //check if email exists in database
    const existingStaff = await Staff.findOne({ email: email });
    //if there is no such email in the staff table
    if (!existingStaff) {
      return res.status(400).json({ msg: "Email is not registered" });
    }

    //compare password entered with the hashed one stored in the staff model
    const passMatch = await bcrypt.compare(password, existingStaff.password);
    //if password does not match
    if (!passMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    //user passed all checks
    //should log in and receive a token

    //First find the role of the user

    //get the id of the staff
    const id = existingStaff.id;
    //check if the prefix is hr- and therefore user is an HR member
    if (id.startsWith("hr-")) {
      const role = "HR";
    }
    //else the prefix of the id is ac- and is therefore an academic staff
    //no other prefixes are available
    //registeration should not add an id with prefixes other than those two
    else {
      //search the academic model for the record with the id
      const existingAcademic = await Academic.findOne({ academicID: id });
      //get the role of the academic staff
      const role = existingAcademic.role;
    }

    //fill the token payload with the staff id and role in uni
    const payload = { id: id, role: role };
    //create a token
    const token = jwt.sign(payload, jwtKey);
    //give the token to the user by adding it to the header of the response
    res.header({ "auth-token": token });

    //TODO: what to send to the user?
    return res.json({ msg: "Login Successful" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//---------------------------------------COURSE COORDINATOR FUNCTIONALITIES-------------------------------------------------

//test to see if I can differentiate between requests
const link = new LinkingSlot({
  senderID: "ac-123",
  receiverID: "ac-1",
  status: "Pending",
  comment: "cheetos 7ar nar",
  sentDate: Date.now(),
  slot: null,
});

/// SYNTAX ERRORS .. the following part is not completed
// console.log(assert.equal(link.__t, "LinkingSlot"));

/* app.get('/slot-linking', authenticateAndAuthoriseCC, (req, res) =>
  {
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;

    //get the notifications of the user
    const notifs = (Acadmic.findOne({id: user.id})).notifications;
    //filter by slot linking type
    for
  }
); */

//-------------------------------------END OF COURSE COORDINATOR FUNCTIONALITIES---------------------------------------------

//------------------------------------------------------------------------
//                    END OF MAYAR'S TRASH
//------------------------------------------------------------------------

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
