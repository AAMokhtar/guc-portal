var express = require('express');
var router = express.Router();

const HTTP_CODES = require('./r_util/httpCodes');
const bcrypt = require("bcryptjs");
const isEmail = require("isemail");



//=====================:-MODELS-:======================

const Staff = require('../mongoose/dao/staff.js');
const Request = require('../mongoose/dao/request.js');
const LinkingSlot = require('../mongoose/dao/linkingSlot.js');
const Leave = require('../mongoose/dao/leave.js');
const DayOff = require('../mongoose/dao/dayOff.js');
const Replacement = require('../mongoose/dao/replacement.js');
const faculty = require('../mongoose/dao/faculty');
const department = require('../mongoose/dao/department');
const Location = require('../mongoose/dao/location');
const location = require('../mongoose/dao/location');
const staff = require('../mongoose/dao/staff.js');

//=====================:-ROUTES-:======================
//TODO: TTOOOOOOO BBBBEEEEEEEEEEEE TESSSSSTEEEEEEEDDDDDDDDD. ALL OF THEM!

/**
 * add a location to the database
 * req.body contains {name, capacity, currentlyTakenSeats(optional), type}
 */
router.post('/addlocation', async (req, res) => {
  //validation is handled in mongoose
  const newLocation = new Location(req.body);

  await newLocation.save()

  res.status(HTTP_CODES.OK).send(newLocation);
});

/**
 * update a location in the database
 * @param locationName is the name of the location we wish to update
 * req.body contains the new values {name, capacity, currentlyTakenSeats, type}
 */
router.put('/updatelocation/:locationName', async (req, res) => {
  const locationName = req.params.locationName;

  //undefined/null location name
  if(!locationName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the location you wish to update"});


  //get the location document
  var locationDoc = await Location.findOne({name: req.name});
  

  //location not found
  if(!locationDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided location does not exist"});


  locationDoc.name = req.body.name;

  locationDoc.capacity = req.body.capacity;

  //if provided, update it
  if(req.body.currentlyTakenSeats)
    locationDoc.currentlyTakenSeats = req.body.currentlyTakenSeats;

  locationDoc.type = req.body.type;

  //validation is handled by mongoose
  await locationDoc.save();

  res.status(HTTP_CODES.OK).send(locationDoc);
});

/**
 * delete a location from the database
 * @param locationName is the name of the location we wish to update
 */
router.put('/deletelocation/:locationName', async (req, res) => {
  const locationName = req.params.locationName;

  //undefined/null location name
  if(!locationName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the location you wish to delete"});


  //get the location document
  var locationDoc = await Location.findOne({name: req.name});
  
  //location not found
  if(!locationDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided location does not exist"});

  
  await locationDoc.remove(function (err) {
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "removal failed"});
  });

  res.status(HTTP_CODES.OK).send(locationName + " removed successfully");
});


//========================LATER========================
router.post('/nonHRregister', async (req, res) => {
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
  }
);

module.exports = router;


//==============================IDK================
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
