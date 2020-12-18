/*const app = require("../../app");
const HR = require("../mongoose/dao/hr");

app.get("/hr/addMissingSign", async function (req, res) {
  /* data has this format
    data :{
     hrID:000000
     staffID:0000
          date: {
        type: Date, // day
      },
      signIn: {
        type: Date,
      },
      signOut: {
        type: Date,
      },
    }
    
  try {
    let data = req.body.data;
    const { hrID, staffID, date, signIn, signOut } = data;
    if ((await HR.find({ id: hrID })).lenght == 0) throw Error("invalid hrID");

    res.status(201).json({ data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e });
  }
});
*/

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

router.post("/register", async (req, res) => {
  try {
    let { email, password, role } = req.body.data;
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

module.exports = router;
