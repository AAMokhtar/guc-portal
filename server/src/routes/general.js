//------------------------------------------------DEPENDENCIES--------------------------------------

var express = require("express");
var router = express.Router();
var isEmail = require("isemail");
//to encrypt and decrypt passwords
//required to store information about current user
const jwt = require("jsonwebtoken");
const properties = require("../../properties.js");

//key used for jsonwebtoken
const key = properties.JWT_KEY;
//-----------------------------------------------END OF DEPENDENCIES----------------------------

//-------------------------------------------------MODELS---------------------------------------------------------------------------------------

const staff = require("../mongoose/dao/staff.js");

//-------------------------------------------------END OF MODELS--------------------------------------------------------------------------

//------------------------------------ROUTES-------------------------------------------

router.post("/register", async (req, res) => {
  try {
    let { email, password, role } = req.body.data;
    if (!isEmail.validate(email)) {
      return res
        .status(400)
        .json({ msg: "Please enter a valid email address" });
    }

    let staffID = await staff.generateID(role);
    if (await staff.checkIfEmailExists(email)) throw Error("Email Exists !!");
    if (password == null) throw Error("Enter a password Please !!");
    let result = await staff.create({ staffID, ...req.body.data });
    res.status(201).json({ msg: "success", user: result });
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: error.message });
  }
});

router.post("/HRregister", async (req, res) => {
  try {
    // the role in this route has to be an HR
    let { email, password, role } = req.body.data;
    if (!isEmail.validate(email)) {
      return res
        .status(400)
        .json({ msg: "Please enter a valid email address" });
    }

    if (role != "HR") throw Error("wrong register route");
    let staffID = await staff.generateID(role);
    if (await staff.checkIfEmailExists(email)) throw Error("Email Exists !!");
    if (password == null) throw Error("Enter a password Please !!");
    let result = await staff.create({ staffID, ...req.body.data });
    res.status(201).json({ msg: "success", user: result });
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: error.message });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

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
    const { staffID, role, id } = existingstaff;

    //fill the token payload with the staff id and role in uni
    const payload = { staffID, role, objectID: id };
    //create a token
    let token = jwt.sign(payload, key, {
      noTimestamp: true,
      expiresIn: "336h", //14 days
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