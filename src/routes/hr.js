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
const Faculty = require('../mongoose/dao/faculty');
const Department = require('../mongoose/dao/department');
const Location = require('../mongoose/dao/location');
const { use } = require('./staff');

//=====================:-ROUTES-:======================

/**
 * add a location to the database
 * req.body contains {name, capacity, currentlyTakenSeats(optional), type}
 */
router.post('/addlocation', async (req, res) => {
  //validation is handled in mongoose
  if(req.body.name)
    req.body.name = req.body.name.toUpperCase();

  if(req.body.type)
    req.body.name = req.body.type.toUpperCase();

  const newLocation = new Location(req.body);

  await newLocation.save().then(() => {
    return res.status(HTTP_CODES.OK).send(newLocation);
  })
  .catch((err) => {
    if(err.code === 11000)
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json({msg: "location " + req.body.name + " already exists"});

    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);

  })
});

/**
 * update a location in the database
 * @param locationName is the name of the location we wish to update
 * req.body contains the new values {name, capacity, currentlyTakenSeats, type}
 */
router.put('/updatelocation/:locationName', async (req, res) => {
  //undefined/null location name
  if(!req.params.locationName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the location you wish to update"});

  const locationName = req.params.locationName.toUpperCase();

  //get the location document
  var locationDoc = await Location.findOne({name: locationName});
  

  //location not found
  if(!locationDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided location does not exist"});


  if(req.body.name){
    req.body.name = req.body.name.toUpperCase();
    locationDoc.name = req.body.name;
  }

  if(req.body.capacity)
    locationDoc.capacity = req.body.capacity;

  //if provided, update it
  if(req.body.currentlyTakenSeats)
    locationDoc.currentlyTakenSeats = req.body.currentlyTakenSeats;

  if(req.body.type)
    locationDoc.type = req.body.type.toUpperCase();

  //validation is handled by mongoose
  await locationDoc.save().then(() => {
    return res.status(HTTP_CODES.OK).send(locationDoc);
  })
  .catch((err) => {
    if(err.code === 11000)
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json({msg: "location " + req.body.name + " already exists"});

    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);

  })
});

/**
 * delete a location from the database
 * @param locationName is the name of the location we wish to delete
 */
router.delete('/deletelocation/:locationName', async (req, res) => {
  //undefined/null location name
  if(!req.params.locationName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the location you wish to delete"});

  const locationName = req.params.locationName.toUpperCase();


  //get the location document
  var locationDoc = await Location.findOne({name: locationName});
  
  //location not found
  if(!locationDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided location does not exist"});

  
  await locationDoc.remove().then(() => {
    res.status(HTTP_CODES.OK).send("location " + locationName + " was removed successfully");
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
    .json({msg: "location removal failed"});
  });
});

/**
 * add a faculty to the database
 * @param name is the name of the faculty we wish to add
 */
router.post('/addfaculty/:name', async (req, res) => {
  //validation is handled in mongoose
  if(req.params.name)
    req.params.name = req.params.name.toUpperCase();

  const newFaculty = new Faculty({name: req.params.name});

  await newFaculty.save().then(() => {
    return res.status(HTTP_CODES.OK).send(newFaculty);
  })
  .catch((err) => {
    if(err.code === 11000)
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json({msg: "faculty " + req.params.name + " already exists"});

    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);
  });
});

/**
 * update a faculty in the database
 * @param facultyName is the name of the faculty we wish to update
 * req.body contains the new value {name}
 */
router.put('/updatefaculty/:facultyName', async (req, res) => {
  //undefined/null faculty name
  if(!req.params.facultyName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the faculty you wish to update"});

  const facultyName = req.params.facultyName.toUpperCase();

  //get the faculty document
  var facultyDoc = await Faculty.findOne({name: facultyName});
  
  //faculty not found
  if(!facultyDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided faculty does not exist"});


  if(req.body.name)
    req.body.name = req.body.name.toUpperCase();
  
  facultyDoc.name = req.body.name;


  //validation is handled by mongoose
  await facultyDoc.save().then(() => {
    return res.status(HTTP_CODES.OK).send(facultyDoc);
  })
  .catch((err) => {
    if(err.code === 11000)
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json({msg: "faculty " + req.body.name + " already exists"});

    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);
  })
});

/**
 * delete a faculty from the database
 * @param facultyName is the name of the faculty we wish to delete
 */
router.delete('/deletefaculty/:facultyName', async (req, res) => {
  //undefined/null faculty name
  if(!req.params.facultyName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the faculty you wish to delete"});

  const facultyName = req.params.facultyName.toUpperCase();



  //get the faculty document
  var facultyDoc = await Faculty.findOne({name: facultyName});
  
  //faculty not found
  if(!facultyDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided faculty does not exist"});

  const objid = facultyDoc._id;
  await facultyDoc.remove().then(async () => {

      var linkedStaff = await Staff.find({facultyID: objid});

      //remove faculty from members
      linkedStaff.forEach(async member =>  {
        member.facultyID = null;
        await member.save();
      });

    res.status(HTTP_CODES.OK).send("faculty " + facultyName + " was removed successfully");
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
    .json({msg: "faculty removal failed"});
  });
});

/**
 * add a department under a faculty. create the department if it does not exist
 * @param facultyName is the name of the faculty we wish to add 
 * the new department under
 */
router.post('/adddepartment/:facultyName/:departmentName', async (req, res) => {
  //validation is handled in mongoose
  if(req.params.facultyName)
    req.params.facultyName = req.params.facultyName.toUpperCase();

  if(req.params.departmentName)
    req.params.departmentName = req.params.departmentName.toUpperCase();


  var facultyDoc = await Faculty.findOne({name: req.params.facultyName});

  //faculty not found
  if(!facultyDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided faculty does not exist"});


  var departmentDoc = await Department.findOne({name: req.params.departmentName});

  var newDepartment;

  if(departmentDoc){
    newDepartment = departmentDoc;

    //add department to faculty 
    facultyDoc.departments.addToSet(newDepartment);

    //save faculty document
    await facultyDoc.save().then(() => {
      return res.status(HTTP_CODES.OK).send(newDepartment);
    }).catch((err) => { 
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json("could not insert department " + req.params.departmentName + " under faculty " + req.params.facultyName);
    });
  }
  else{
    newDepartment = new Department({name: req.params.departmentName});


    //try adding department
    await newDepartment.save().then( async() => {

    //add department to faculty 
    facultyDoc.departments.push(newDepartment);

    //save faculty document
    await facultyDoc.save().then(() => {
      return res.status(HTTP_CODES.OK).send(newDepartment);
    }).catch((err) => { 
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json("could not insert department " + req.params.departmentName + " under faculty " + req.params.facultyName);
    });
    })
    .catch((err) => {
      if(err.code === 11000)
        return res.status(HTTP_CODES.BAD_REQUEST)
        .json({msg: "department " + req.params.departmentName + " already exists"});

      return res.status(HTTP_CODES.BAD_REQUEST)
      .json(err.message);
    });
  }
});

/**
 * update a department in the database
 * @param facultyName is the name of the faculty we wish to update
 * req.body contains the new value {name}
 */
router.put('/updatefaculty/:facultyName', async (req, res) => {
  //undefined/null faculty name
  if(!req.params.facultyName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the faculty you wish to update"});

  const facultyName = req.params.facultyName.toUpperCase();

  //get the faculty document
  var facultyDoc = await Faculty.findOne({name: facultyName});
  
  //faculty not found
  if(!facultyDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided faculty does not exist"});


  if(req.body.name)
    req.body.name = req.body.name.toUpperCase();
  
  facultyDoc.name = req.body.name;


  //validation is handled by mongoose
  await facultyDoc.save().then(() => {
    return res.status(HTTP_CODES.OK).send(facultyDoc);
  })
  .catch((err) => {
    if(err.code === 11000)
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json({msg: "faculty " + req.body.name + " already exists"});

    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);
  })
});

/**
 * delete a faculty from the database
 * @param facultyName is the name of the faculty we wish to delete
 */
router.delete('/deletefaculty/:facultyName', async (req, res) => {
  //undefined/null faculty name
  if(!req.params.facultyName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the faculty you wish to delete"});

  const facultyName = req.params.facultyName.toUpperCase();



  //get the faculty document
  var facultyDoc = await Faculty.findOne({name: facultyName});
  
  //faculty not found
  if(!facultyDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided faculty does not exist"});

  
  await facultyDoc.remove().then(() => {
    res.status(HTTP_CODES.OK).send("faculty " + facultyName + " was removed successfully");
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
    .json({msg: "faculty removal failed"});
  });
});

/**
 * add a new staff member to the system
 * 
 * req.body should include:
 * {
 * "email",
 * "name",
 * "gender",
 * "dayOff",
 * "salary",
 * "officeLocation",
 * "faculty",
 * "department",
 * "others",
 * "role",
 * }
 */
router.post('/addstaff', async (req, res) => {
    try {
      var user = {};

      user.role = req.body.role;

      if(user.role)
        user.staffID = await Staff.generateID(user.role);

        user.name = req.body.name;
        user.email = req.body.email;

      //validate email
      if (!isEmail.validate(user.email)) {
        return res
          .status(HTTP_CODES.BAD_REQUEST)
          .json({ msg: "Please enter a valid email address" });
      }

      if (await Staff.checkIfEmailExists(user.email)) throw Error("Email Exists !!");

      user.salary = req.body.salary;    

      var officeLocation;
      if(req.body.officeLocation){
        req.body.officeLocation = req.body.officeLocation.toUpperCase();

        officeLocation = await Location.findOne({name: req.body.officeLocation, type: 'OFFICE'});

        if(officeLocation){
          if(officeLocation.capacity == officeLocation.currentlyTakenSeats)
            return res
            .status(HTTP_CODES.BAD_REQUEST)
            .json({ msg: "the provided office location is full" });

            officeLocation.currentlyTakenSeats++;
            user.officeLocationID = officeLocation._id;
        }
        else
          return res
          .status(HTTP_CODES.BAD_REQUEST)
          .json({ msg: "the provided office location does not exist or is not an office"});
      }

      user.others = req.body.others;

      if(req.body.faculty){
        var faculty = await Faculty.findOne({name: req.body.faculty.toUpperCase()});
        if(!faculty)
          return res.status(HTTP_CODES.NOT_FOUND)
          .json({msg: "the provided faculty does not exist"});

        user.facultyID = faculty._id;
        if(req.body.department){

          var dep = await Department.findOne({name: req.body.department.toUpperCase()});
          if(dep)
            dep = dep._id;

          const depExists = faculty.departments.filter((item) => {
              return item._id.equals(dep);
          });

          if(depExists.length == 0){
            return res.status(HTTP_CODES.NOT_FOUND)
            .json({msg: "the provided department does not exist under the faculty " + req.body.faculty});
          }
          else{
            user.departmentID = dep;
          }
        }
      }

      user.dayOff = 'Saturday';

      if(req.body.dayOff && user.role != "HR"){
        user.dayOff = req.body.dayOff;
      }

      user.gender = req.body.gender

      user.password = '123456';

      var curDate = new Date();
      curDate.setUTCHours(0,0,0,0);

      //initialize attendance record
      user.attendance = [];
      user.attendance.push({
        date: curDate.toUTCString(),
        signIn: [],
        signOut: []
      });

      //get next day
      curDate.setUTCDate(curDate.getUTCDate() + 1);
        
      //for the rest of the month
      while(curDate.getUTCDate() != 11){
        //initialize attendance record
        user.attendance.push({
          date: curDate.toUTCString(),
          signIn: [],
          signOut: []
        });

        //get next day
        curDate.setUTCDate(curDate.getUTCDate() + 1);
      }

      user.leaveBalance = 2.5;
      user.accidentDays = 0;

      let newUser = await Staff.create(user);

      if(officeLocation){
        await officeLocation.save();
      }

      res.status(HTTP_CODES.CREATED).json({ msg: "success", user: newUser });
    } catch (error) {
      console.log(error);
      res.status(HTTP_CODES.BAD_REQUEST).json({ msg: error.message });
    }
  }
);

/**
 * update a user's info. 
 * req.body contains the updated user 
 * @param staffID is the id of the user we wish to update
 * updated values:
 * @param name is the updated name
 * @param email is the updated email
 * @param password is the updated password
 * @param gender is the updated gender
 * @param leaveBalance is the updated leaveBalance
 * @param accidentDays is the updated accidentDays
 * @param officeLocation is the updated office location name
 * @param faculty is the name of the updated faculty
 * @param department is the name of the updated department
 * @param others is any extra info the user wants to provide (JSON)
 */
router.put('/updatestaff', async function(req, res) {
  const curid = req.body.staffID;

  var updatedUser = req.body;
  var user = await Staff.findOne({'staffID': curid});


  //undefined document --> not found
  if(!user){
      return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
  }
  
  if(req.body.name)
    user.name = req.body.name; 

  if(req.body.password)
    user.password = req.body.password;

  if(req.body.gender)
    user.gender = req.body.gender;

  if(req.body.leaveBalance)
    user.leaveBalance = req.body.leaveBalance;

  if(req.body.accidentDays)
    user.accidentDays = req.body.accidentDays;

  if(req.body.others)
    user.others = req.body.others;
  //get object ids of new faculty + department. verify that 
  //this department falls under the faculty 
      
  //=================FACULTY=================
  //if faculty name provided, find it and update the user
  if(req.body.faculty){
    var faculty = await Faculty.findOne({name: req.body.faculty.toUpperCase()});
    if(!faculty)
      return res.status(HTTP_CODES.NOT_FOUND)
      .json({msg: "the provided faculty does not exist"});

    user.facultyID = faculty._id;
    if(req.body.department){

    var dep = await Department.findOne({name: req.body.department.toUpperCase()});
    if(dep)
      dep = dep._id;

      const depExists = faculty.departments.filter((item) => {
        return item._id.equals(dep);
      });

      if(depExists.length == 0){
        return res.status(HTTP_CODES.NOT_FOUND)
        .json({msg: "the provided department does not exist under the faculty " + req.body.faculty});
      }
      else{
        user.departmentID = dep;
      }
    }
  }

  //=================EMAIL=================
  //email is provided
  if(req.body.email){
      if (!isEmail.validate(req.body.email)) {
          return res
          .status(HTTP_CODES.BAD_REQUEST)
          .json({ msg: "Please enter a valid email address" });
      }

      user.email = req.body.email;
  }

  //============OFFICE-LOCATION=============
  //user provided an office location
  var office;
  var userOffice;
  if(req.body.officeLocation){
    office = await Location.findOne({name: req.body.officeLocation.toUpperCase()});

    //location does not exist
    if(!office){
        return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ msg: "office location does not exist" });
    }

    //location is not an office
    if(office.type != "OFFICE"){
        return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ msg: "the office location provided is not of type office"});
    }

    //location is not an office
    if(user.officeLocationID._id != office._id){
      if(office.currentlyTakenSeats == office.capacity){
        return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ msg: "the provided office location is full"});
      }

      //update the user's office location
      office.currentlyTakenSeats++;

      userOffice = await Location.findById(user.officeLocationID);
      if(userOffice)
        userOffice.currentlyTakenSeats--;

      user.officeLocationID = office._id;
    }
  }

  //save the updated user
  await user.save().then(async () => {

    if(office)
      await office.save();

    if(userOffice)
      await userOffice.save();
    
    return res.status(HTTP_CODES.OK).send(user);
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json(err.message);
  });
  
});

/**
 * delete a staff member from the system.
 * @param staffID is the id of the user we wish to delete
 */
router.delete('/deletestaff/:staffID', async function(req, res) {
  const curid = req.params.staffID;

  var updatedUser = req.body;
  var user = await Staff.findOne({'staffID': curid});


  //undefined document --> not found
  if(!user){
      return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
  }
  
  var userRequests = await Request.find({$or:[{'senderID': user._id},{'receiverID': user._id}]});

  userRequests.forEach(async r => {
    await r.remove().catch(() => {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({msg: "failed to remove user requests"});
    })
  });

  //remove user
  await user.remove().then(() => {
    return res.status(HTTP_CODES.OK).send(user);
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json(err.message);
  });
  
});

/**
 * add missing attendance for a user
 * @param staffID is the id of the user we wish to modify
 * req.body contains {attendanceDateTime, inOut}
 * attendanceDateTime is the date and time of the sign in/out
 * inOut is a sting indicating whether this is a sign in or a sign out. values: [IN,OUT] 
 */
router.put('/addmissingattendance/:staffID', async function(req, res) {
  if(!req.params.staffID)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the staff id of the user"});
  
  if(req.user.staffID == req.params.staffID)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "you cannot update your own attendance"});

  if(!req.body.attendanceDateTime)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the date of the attendance record"});

  if(!req.body.inOut)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please specify whether the missing attendance is a sign in or out [IN,OUT]"});

  req.params.inOut = req.body.inOut.toUpperCase();

  var user = await Staff.findOne({'staffID': req.params.staffID});

  //undefined document --> not found
  if(!user){
    return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
  }

  //get the requested dateTime
  var date = req.body.attendanceDateTime;

  if(typeof date === 'string')
    date = new Date(date);

  //extract the day
  var day = new Date(date.getTime());

  //remove time
  day.setUTCHours(0,0,0,0);

  var attendanceRecord = await user.attendance.find(elem => +elem.date == +day);

  if(!attendanceRecord){
    return res.status(HTTP_CODES.NOT_FOUND).json({msg: "attendance record not found"});
}

  console.log(attendanceRecord);
  if(req.params.inOut == 'IN')
    attendanceRecord.signIn.push(date);

  if(req.params.inOut == 'OUT')
    attendanceRecord.signOut.push(date);

  //save updated user
  await user.save().then(() => {
    return res.status(HTTP_CODES.OK).send(attendanceRecord);
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json(err.message);
  });

});

/**
 * view any user's attendance record
 * @param staffID is the id of the user we wish to view
 */
router.get('/viewattendance/:staffID', async function(req, res) {
  if(!req.params.staffID)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the staff id of the user"});


  var user = await Staff.findOne({'staffID': req.params.staffID});

  //undefined document --> not found
  if(!user){
    return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
  }

  var attendanceRecord = user.attendance

  if(!attendanceRecord){
    return res.status(HTTP_CODES.NOT_FOUND).json({msg: "attendance record not found"});
}
  return res.status(HTTP_CODES.OK).send(attendanceRecord);
});

module.exports = router;


