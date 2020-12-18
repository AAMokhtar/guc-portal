//------------------------------------------------DEPENDENCIES--------------------------------------

var express = require("express");
var router = express.Router();
var isEmail = require("isemail");
//to encrypt and decrypt passwords
//required to store information about current user
const jwt = require("jsonwebtoken");
//-----------------------------------------------END OF DEPENDENCIES----------------------------

//-------------------------------------------------MODELS---------------------------------------------------------------------------------------

const staff = require("../mongoose/dao/staff.js");

//-------------------------------------------------END OF MODELS--------------------------------------------------------------------------

//------------------------------------ROUTES-------------------------------------------

//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.data;

    //if user didn't enter email or password
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please enter both email and password" });
    }

    //if email entered is not valid
    if (!isEmail.validate(email)) {
      return res
        .status(400)
        .json({ msg: "Please enter a valid email address" });
    }

    //TODO: validate password

    //check if email exists in database
    const existingstaff = await staff.findByCredentials(email, password);

    //user passed all checks
    //should log in and receive a token

    //First find the role of the user

    //get the id of the staff
    const { staffID, role } = existingstaff;

    //fill the token payload with the staff id and role in uni
    const payload = { staffID, role };
    //create a token
    let token = jwt.sign(payload, "secret", {
      noTimestamp: true,
      expiresIn: "1h",
    });
    //give the token to the user by adding it to the header of the response
    res.header({ "auth-token": token });

    //TODO: what to send to the user?
    return res.json({ msg: "Login Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//------------------------------------------END OF ROUTES-----------------------------------------------------

module.exports = router;
