const jwt = require("jsonwebtoken");
const properties = require("../../properties.js");

//key used for jsonwebtoken
const key = properties.JWT_KEY;

//Authentication middeware
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
function authenticateAndAuthorise(role) {
  return function (req, res, next) {
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
      console.log(role, verified.role);
      //gets the user's role in the university
      if ((!role && verified.role) || role == verified.role) {
        //if current user is a course coordinator, continue executing the next function
        next();
      } else {
        return res
          .status(401)
          .json({ msg: "Unauthorized to access this page." });
      }
    } catch (
      error //catches error thrown should token fail verification
    ) {
      console.log(error);

      return res.status(500).json({ msg: error.message });
    }
  };
}

//Authentication and Authorisation middleware
//checks if staff is academic
function authenticateAndAuthoriseAC(req, res, next) {
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

    //if the role is not HR (i.e. academic)
    if (verified.role !== "HR") {
      next();
    } else {
      return res.status(401).json({ msg: "Unauthorized to access this page." });
    }
  } catch (
    error //catches error thrown should token fail verification
  ) {
    console.log(error);

    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  authenticate,
  authenticateAndAuthorise,
  authenticateAndAuthoriseAC,
};
