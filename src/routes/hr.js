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
const Course = require('../mongoose/dao/course');


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
 * @param facultyName is the name of the faculty we wish to add the new department under
 * @param departmentName is the dperatment name we wish to add
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
 * @param facultyName is the name of the faculty containing the department we wish to update
 * @param departmentName is the name of the department we wish to update
 * req.body contains {name, hodID}
 * name is the new name of the department
 * hodID is the id of the new hod 
 */
router.put('/updatedepartment/:facultyName/:departmentName', async (req, res) => {

  // undefined/null faculty name
  if(!req.params.facultyName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the faculty containing the department"});

  // undefined/null department name
   if(!req.params.departmentName)
   return res.status(HTTP_CODES.BAD_REQUEST)
   .json({msg: "please provide the name of the department"});


  //get the faculty document
  var facultyDoc = await Faculty.findOne({name: req.params.facultyName.toUpperCase()});
  
  //faculty not found
  if(!facultyDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided faculty does not exist"});


  //get the department document
  var departmentDoc = await Department.findOne({name: req.params.departmentName.toUpperCase()});
  
  //department not found
  if(!departmentDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided department does not exist"});

  const depExists = facultyDoc.departments.filter((item) => {
      return item._id.equals(departmentDoc._id);
  });

  if(depExists.length == 0){
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided department does not fall under the given faculty"});
  }

  if(req.body.name)
    departmentDoc.name = req.body.name.toUpperCase();

  var hod;

  if(req.body.hodID){
    hod = await Staff.findOne({'staffID': req.body.hodID});

    if(!hod)
      return res.status(HTTP_CODES.NOT_FOUND)
      .json({msg: "no user exists with the provided staff id"});

    if(hod.role != "HOD")
      return res.status(HTTP_CODES.NOT_FOUND)
      .json({msg: "the HOD id provided does not belong to a HOD"});

    departmentDoc.hodID = hod._id;

    hod.facultyID = facultyDoc._id;
    hod.departmentID = departmentDoc._id;

  }

  //validation is handled by mongoose
  await departmentDoc.save().then(async () => {

    if(hod)
      await hod.save();

    return res.status(HTTP_CODES.OK).send(departmentDoc);
  })
  .catch((err) => {
    if(err.code === 11000)
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json({msg: "department " + departmentDoc.name + " already exists"});

    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);
  })
});

/**
 * remove a department under a faculty
 * @param facultyName is the name of the faculty containing the department we wish to remove
 * @param departmentName is the name of the department we wish to remove
 */
router.put('/removedepartment/:facultyName/:departmentName', async (req, res) => {

  // undefined/null faculty name
  if(!req.params.facultyName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the faculty containing the department"});

  // undefined/null department name
   if(!req.params.departmentName)
   return res.status(HTTP_CODES.BAD_REQUEST)
   .json({msg: "please provide the name of the department"});


  //get the faculty document
  var facultyDoc = await Faculty.findOne({name: req.params.facultyName.toUpperCase()});
  
  //faculty not found
  if(!facultyDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided faculty does not exist"});


  //get the department document
  var departmentDoc = await Department.findOne({name: req.params.departmentName.toUpperCase()});
  
  //department not found
  if(!departmentDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided department does not exist"});

  const depExists = facultyDoc.departments.filter((item) => {
      return item._id.equals(departmentDoc._id);
  });

  if(depExists.length == 0){
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided department does not fall under the given faculty"});
  }

  facultyDoc.departments = facultyDoc.departments.filter((item) => {return !item._id.equals(departmentDoc._id)});

  //validation is handled by mongoose
  await facultyDoc.save().then(async () => {
    return res.status(HTTP_CODES.OK).send(facultyDoc);
  })
  .catch((err) => {
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);
  })
});

/**
 * delete a department from the database
 * @param departmentName is the name of the department we wish to delete
 */
router.delete('/deletedepartment/:departmentName', async (req, res) => {
  //undefined/null department name
  if(!req.params.departmentName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the department you wish to delete"});

  const departmentName = req.params.departmentName.toUpperCase();

  //get the department document
  var departmentDoc = await Department.findOne({name: departmentName});
  
  //department not found
  if(!departmentDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided department does not exist"});

  
  await departmentDoc.remove().then(() => {
    res.status(HTTP_CODES.OK).send("department " + departmentName + " was removed successfully");
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
    .json({msg: "department removal failed"});
  });
});

/**
 * add a course under a department. create the course if it does not exist
 * @param departmentName is the dperatment name we wish to add the course under
 * @param courseCode is the code of the course we wish to add 
 */
router.post('/addcourse/:departmentName/:courseCode', async (req, res) => {
  //validation is handled in mongoose
  if(req.params.departmentName)
    req.params.departmentName = req.params.departmentName.toUpperCase();

  if(req.params.courseCode)
    req.params.courseCode = req.params.courseCode.toUpperCase();


  var departmentDoc = await Department.findOne({name: req.params.departmentName});

  //department not found
  if(!departmentDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided department does not exist"});


  var courseDoc = await Course.findOne({courseCode: req.params.courseCode});

  var newCourse;

  if(courseDoc){
    newCourse = courseDoc;

    //add department to department 
    departmentDoc.coursesIDs.addToSet(newCourse);

    //save department document
    await departmentDoc.save().then(() => {
      return res.status(HTTP_CODES.OK).send(newDepartment);
    }).catch((err) => { 
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json("could not insert course " + req.params.courseCode + " under department " + req.params.departmentName);
    });
  }
  else{
    newCourse = new Course({courseCode: req.params.courseCode});


    //try adding department
    await newCourse.save().then( async() => {

    //add department to faculty 
    departmentDoc.coursesIDs.push(newCourse);

    //save department document
    await departmentDoc.save().then(() => {
      return res.status(HTTP_CODES.OK).send(newCourse);
    }).catch((err) => { 
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json("could not insert course " + req.params.courseCode + " under department " + req.params.departmentName);
    });
    })
    .catch((err) => {
      if(err.code === 11000)
        return res.status(HTTP_CODES.BAD_REQUEST)
        .json({msg: "course " + req.params.courseCode + " already exists"});

      return res.status(HTTP_CODES.BAD_REQUEST)
      .json(err.message);
    });
  }
});

/**
 * update a course in the database
 * @param departmentName is the name of the department containing the course we wish to update
 * @param courseCode is the code of the course we wish to update
 * req.body contains {code}
 * name is the new code of the course
 */
router.put('/updatecourse/:departmentName/:courseCode', async (req, res) => {

  // undefined/null department name
  if(!req.params.departmentName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the department containing the department"});

  // undefined/null course code
   if(!req.params.courseCode)
   return res.status(HTTP_CODES.BAD_REQUEST)
   .json({msg: "please provide the code of the course you wish to update"});


  //get the department document
  var departmentDoc = await Department.findOne({name: req.params.departmentName.toUpperCase()});
  
  //department not found
  if(!departmentDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided department does not exist"});


  //get the course document
  var courseDoc = await Course.findOne({courseCode: req.params.courseCode.toUpperCase()});
  
  //course not found
  if(!courseDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided course does not exist"});

  const courseExists = departmentDoc.coursesIDs.filter((item) => {
      return item._id.equals(courseDoc._id);
  });

  if(courseExists.length == 0){
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided course does not fall under the given department"});
  }

  if(req.body.code)
    courseDoc.courseCode = req.body.code.toUpperCase();

  //validation is handled by mongoose
  await courseDoc.save().then(async () => {
    return res.status(HTTP_CODES.OK).send(courseDoc);
  })
  .catch((err) => {
    if(err.code === 11000)
      return res.status(HTTP_CODES.BAD_REQUEST)
      .json({msg: "course " + courseDoc.courseCode + " already exists"});

    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);
  })
});

/**
 * remove a course under a department
 * @param departmentName is the name of the department containing the department we wish to remove
 * @param courseCode is the code of the course we wish to remove
 */
router.put('/removecourse/:departmentName/:courseCode', async (req, res) => {

  // undefined/null department name
  if(!req.params.departmentName)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the department containing the course"});

  // undefined/null department name
   if(!req.params.courseCode)
   return res.status(HTTP_CODES.BAD_REQUEST)
   .json({msg: "please provide the name of the course"});


  //get the department document
  var departmentDoc = await Department.findOne({name: req.params.departmentName.toUpperCase()});
  
  //department not found
  if(!departmentDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided department does not exist"});


  //get the course document
  var courseDoc = await Course.findOne({courseCode: req.params.courseCode.toUpperCase()});
  
  //course not found
  if(!courseDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided course does not exist"});

  const courseExists = departmentDoc.coursesIDs.filter((item) => {
      return item._id.equals(courseDoc._id);
  });

  if(courseExists.length == 0){
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided course does not fall under the given department"});
  }

  departmentDoc.coursesIDs = departmentDoc.coursesIDs.filter((item) => {return !item._id.equals(courseDoc._id)});

  //validation is handled by mongoose
  await departmentDoc.save().then(async () => {
    return res.status(HTTP_CODES.OK).send(departmentDoc);
  })
  .catch((err) => {
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json(err.message);
  })
});

/**
 * delete a course from the database
 * @param courseCode is the code of the course we wish to delete
 */
router.delete('/deletecourse/:courseCode', async (req, res) => {
  //undefined/null course name
  if(!req.params.courseCode)
    return res.status(HTTP_CODES.BAD_REQUEST)
    .json({msg: "please provide the name of the course you wish to delete"});

  const courseCode = req.params.courseCode.toUpperCase();

  //get the course document
  var courseDoc = await Course.findOne({courseCode: courseCode});
  
  //course not found
  if(!courseDoc)
    return res.status(HTTP_CODES.NOT_FOUND)
    .json({msg: "the provided course does not exist"});

  
  await courseDoc.remove().then(() => {
    res.status(HTTP_CODES.OK).send("course " + courseCode + " was removed successfully");
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
    .json({msg: "course removal failed"});
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

      var dep;
      if(req.body.faculty){
        var faculty = await Faculty.findOne({name: req.body.faculty.toUpperCase()});
        if(!faculty)
          return res.status(HTTP_CODES.NOT_FOUND)
          .json({msg: "the provided faculty does not exist"});

        user.facultyID = faculty._id;
        if(req.body.department){

          dep = await Department.findOne({name: req.body.department.toUpperCase()});

          const depExists = faculty.departments.filter((item) => {
              return item._id.equals(dep._id);
          });

          if(depExists.length == 0){
            return res.status(HTTP_CODES.NOT_FOUND)
            .json({msg: "the provided department does not exist under the faculty " + req.body.faculty});
          }
          else{
            user.departmentID = dep._id;
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

      if(dep && newUser.role == "HOD"){
        dep.hodID = newUser._id;
        await dep.save();
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
  var dep;
  if(req.body.faculty){
    var faculty = await Faculty.findOne({name: req.body.faculty.toUpperCase()});
    if(!faculty)
      return res.status(HTTP_CODES.NOT_FOUND)
      .json({msg: "the provided faculty does not exist"});

    user.facultyID = faculty._id;
    if(req.body.department){

    dep = await Department.findOne({name: req.body.department.toUpperCase()});

      const depExists = faculty.departments.filter((item) => {
        return item._id.equals(dep._id);
      });

      if(depExists.length == 0){
        return res.status(HTTP_CODES.NOT_FOUND)
        .json({msg: "the provided department does not exist under the faculty " + req.body.faculty});
      }
      else{
        user.departmentID = dep._id;
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

    if(dep && user.role == "HOD");
      dep.hodID = user._id;
    
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

/**
 * get users with missing days/hours
 */
router.get('/viewmissingusers', async function(req, res) {
  const cursor = Staff.find().cursor();

  //undefined document --> not found
  if(!cursor){
    return res.status(HTTP_CODES.NOT_FOUND).json({msg: "no users found"});
  }

  var users = [];
  for (let user = await cursor.next(); user != null; user = await cursor.next()) {
    const userMissingDayHours = await missingDayHours(user);

    var curRec = {};

    if(userMissingDayHours.days > 0 || userMissingDayHours.hours > 0){
      curRec.staffID = user.staffID;
      curRec.missingDays = userMissingDayHours.days;
      curRec.missingHours = userMissingDayHours.hours;
      users.push(curRec);
    }
  }

  return res.status(HTTP_CODES.OK).send(users);
});

/**
 * update a staff member's salary
 * @param staffID is the id of the user we wish to modify
 * @param newSalary is the updated salary
 */
router.put('/updatesalary/:staffID/:newSalary', async function(req, res) {
  const curid = req.params.staffID;

  //undefined staffID
  if(!req.params.staffID){
      return res.status(HTTP_CODES.BAD_REQUEST).json({msg: "please provide the staff id"});
  }

  //undefined staffID
  if(!req.params.newSalary){
      return res.status(HTTP_CODES.BAD_REQUEST).json({msg: "please provide the updated salary"});
  }

  var user = await Staff.findOne({'staffID': curid});

  //undefined document --> not found
  if(!user){
      return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
  }
  
  user.salary = req.params.newSalary;

  //update user
  await user.save().then(() => {
    return res.status(HTTP_CODES.OK).send(user);
  }).catch((err) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json(err.message);
  });
  
});

module.exports = router;

//==========================HELPERS===========================
async function missingDayHours(user){

  if(!user){
      return {};
  }
  
  //user's day off
  var dayOff = dayToInt(user.dayOff);

  //today in utc
  const curDate = new Date();
  curDate.setUTCHours(0,0,0,0);

  var startDate;

  //start date in previous month
  if(curDate.getDate() < 11){

      var year = curDate.getFullYear();
      var month = curDate.getMonth() - 1;

      if(month < 0){
          month = 11;
          year--;
      }

      //11th of the previous month
      startDate = new Date(Date.UTC(year, month, 11, 0, 0, 0, 0));
  }
  //start date in current month
  else{

      var year = curDate.getFullYear();
      var month = curDate.getMonth() + 1;

      if(month > 11){
          month = 0;
          year++;
      }

      //11th of the previous month
      startDate = new Date(Date.UTC(curDate.getFullYear(), curDate.getMonth(), 11, 0, 0, 0, 0));
  }

  //filter the attendance to reduce the array as much as possible
  var missingDaysP1 = user.attendance.filter(elem => 
      elem.date >= startDate 
      && elem.date <= curDate
      && elem.date.getDay() != 5
      && elem.date.getDay() != dayOff);

  //apply the expensive leave request filter on the reduced array
  var missingDayHour = [];

  for (const day of missingDaysP1){
      const off = await acceptedLeaveOnDate(user._id, day.date);
      if(!off){
        missingDayHour.push(day);
      }
  }

  //missing days
  var missingDayHourP1 = missingDayHour.filter(elem => 
    elem.signIn.length == 0 || elem.signOut.length == 0);

  var missingDayHourP2 = missingDayHour.filter(elem => 
    elem.signIn.length != 0 || elem.signOut.length != 0);

  var totalMissingHours = 0;
  missingDayHourP2.forEach(attDay => {
    var workedms = 0.0;


    //at 07:00AM
    var dayStart = new Date(Date.UTC(
        attDay.date.getFullYear(), 
        attDay.date.getMonth(), 
        attDay.date.getDate(), 7, 0, 0, 0));
            
    //at 07:00PM
    var dayEnd = new Date(Date.UTC(
        attDay.date.getFullYear(), 
        attDay.date.getMonth(), 
        attDay.date.getDate(), 19, 0, 0, 0));

    attDay.signIn.forEach((elem, indx) => {
        //sign in without a sign out
        if(indx >=  attDay.signOut.length)
            return;

        //calculate the amount of milliseconds worked from 7AM to 7PM
        workedms += Math.min(dayEnd.getTime(), attDay.signOut[indx].getTime())
        - Math.max(dayStart.getTime(), elem.getTime());
    });

    //calculate the missing hours that day (required hours - worked hours)
    var missingHours = Math.max(8.4 - workedms / (1000 * 60  * 60), 0);
    //accumulate missing hours
    totalMissingHours += missingHours;
  });

  //return the missing days so far
  return {days: missingDayHourP1.length, hours: totalMissingHours};
}

async function acceptedLeaveOnDate(sender ,date){

  //all accepted leave requests for the user that enclose the parameter date
  var requests = await Request.find({
      senderID: sender,
      status: 'Accepted',
      leave: {$exists: true},
      'leave.startDate': {$lte: date},
      'leave.endDate': {$gte: date}
  });

  return requests.length > 0;
}

function dayToInt(day){
  switch(day) {
      case 'Sunday':
          return 0;
      case 'Monday':
          return 1;
      case 'Tuesday':
          return 2;
      case 'Wednesday':
          return 3;
      case 'Thursday':
          return 4;
      case 'Saturday':
          return 6;
      default:
          return 5;
  };
}


