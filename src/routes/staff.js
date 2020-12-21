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


//=====================:-ROUTES-:======================
/**
 * fetch current user from the database
 */
router.get('/myprofile', async function(req, res) {
    //get the user
    const user = await Staff.findOne({'staffID': req.user.staffID});

    //user does not exist
    if(!user){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
    }

    //remove sensitive info 
    user.set('password', null); // password is null

    //otherwise return the user
    return res.status(HTTP_CODES.OK).send(user); 
});

/**
 * update a user's info. 
 * NOTE: academic members can’t update their salary, faculty and department.
 * req.body contains the updated user 
 * @param email is the updated emai;
 * @param gender is the updated gender
 * @param officeLocation is the updated office location name
 * @param facultyName is the name of the updated faculty
 * @param departmentName is the name of the updated department
 * @param others is any extra info the user wants to provide (JSON)
 */
router.put('/updateprofile', async function(req, res) {
    const curid = req.user.staffID;

    var updatedUser = req.body;
    var user = await Staff.findOne({'staffID': curid});


    //undefined document --> not found
    if(!user){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
    }
    
    //password is updated in another route
    /**
     * the users are unauthorized to update the following:
     * staffID
     * name
     * dayOff
     * leaveBalance
     * attendance
     * accidentDays
     * notifications
     * role
     * schedule
     * courseIDs
     */

    //academic members cannot update their salary, faculty, department
    if(curid.startsWith('h')){
        //get object ids of new faculty + department. verify that 
        //this department falls under the faculty 
        
        //=================FACULTY=================
        //if faculty name provided, find it and update the user
        if(updatedUser.facultyName){
            const userFaculty = await faculty.findOne({name: updatedUser.facultyName});

            if(!userFaculty){
                return res.status(HTTP_CODES.NOT_FOUND).json({msg: "no faculty exists with the name " + updatedUser.facultyName});
            }

            //manually populating + updating faculty
            user.facultyID = userFaculty;
        }

        //faculty name is not provided, populate the users's current faculty
        else{
            user.populate('facultyID');
        }

        //=================DEPARTMENT=================
        //user want to update the department
        if(updatedUser.departmentName){
            userFaculty = user.facultyID;

            //populate and filter departments by the provided name
            userFaculty.populate({
                path: 'departments',
                match: {
                    name: updatedUser.departmentName
                }
            });

            const department = userFaculty.departments

            //no department exists with that name
            if(department.length < 1){
                return res.status(HTTP_CODES.NOT_FOUND)
                .json({msg: "no department exists with the name" + updatedUser.departmentName +" under the faculty "+ userFaculty.name});
            }
            

            //update the user's department
            user.departmentID = department[0]._id;
        }

        //=================SALARY=================
        //salary is provided
        if(updatedUser.salary){

            //salary should be non-negative
            if(updatedUser.salary < 0){
                return res
                .status(HTTP_CODES.BAD_REQUEST)
                .json({ msg: "salary should be a non-negative number"});
            }
            user.salary = updatedUser.salary;
        }
    }

    //=================EMAIL=================
    //email is provided
    if(updatedUser.officeLocation){
        if (!isEmail.validate(updatedUser.email)) {
            return res
            .status(HTTP_CODES.BAD_REQUEST)
            .json({ msg: "Please enter a valid email address" });
        }
    }

    //============OFFICE-LOCATION=============
    //user provided an office location
    if(updatedUser.officeLocation){
        const office = await Location.findOne({name: updatedUser.officeLocation});

        //location does not exist
        if(!office){
            return res
            .status(HTTP_CODES.NOT_FOUND)
            .json({ msg: "office location does not exist" });
        }

        //location is not an office
        if(office.type != "Office"){
            return res
            .status(HTTP_CODES.NOT_FOUND)
            .json({ msg: "the office location provided is not of type office"});
        }

        //update the user's office location
        user.officeLocationID = office._id;
    }

    //============OFFICE-LOCATION=============
    if(updatedUser.others){
        user.others = updatedUser.others;
    }

    //should they update role or schedule from here?

    //save the updated user document
    await user.save();
    
    return res.status(HTTP_CODES.OK).send(user);
});

/**
 * Reset a user's password
 * @param curPassword is the user's current password (before updating)
 * @param newPassword is the user's new password (after updating)
 */
router.put('/resetpassword', async function(req, res) {
    const curid = req.user.staffID;
    var user = await Staff.findOne({'staffID': curid});

    if(!user){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
    }

    //current password(entered in body) matches the existing one
    const curPassMatch = await bcrypt.compare(req.body.curPassword, user.password);

    if(!curPassMatch){
        return res.status(HTTP_CODES.BAD_REQUEST).json({msg: 'current password is incorrect'});
    }

    //new password(entered in body) matches the existing one
    const newPassMatch = await bcrypt.compare(req.body.newPassword, user.password);

    if(newPassMatch){
        return res.status(HTTP_CODES.BAD_REQUEST).json({msg: 'new password cannot be the same as the current password'});
    }

    //update the user document (hashing is done on .save())
    user.password = req.body.newPassword;
    await user.save();


    return res.status(HTTP_CODES.OK).send(user);
});


/**
 * Sign a user into the system 
 */
router.put('/signin', async function(req, res) {

    //get the user document
    const curid = req.user.staffID;
    var user = await Staff.findOne({'staffID': curid});

    if(!user){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
    }

    //now
    var curDateTime = new Date();

    //curDateTime but with time set to 00:00
    var curDate =  new Date();
    curDate.setUTCHours(0,0,0,0);

    //get today's attendance from the array 
    const curAtt = await user.attendance.find(elem => +elem.date == +curDate);

    console.log(curDate)
    console.log(user.attendance)

    if(!curAtt){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "attendance record not found"});
    }

    //user cannot sign in twice without signing out in between 
    if(curAtt.signIn.length > curAtt.signOut.length){
        return res.status(HTTP_CODES.BAD_REQUEST).json({msg: "you are already signed in"});
    }

    //register user signin
    curAtt.signIn.push(curDateTime);

    //update the user document
    await user.save();

    return res.status(HTTP_CODES.OK).json({msg: 'successful sign in on '+ curDateTime});
});

/**
 * Sign a user out of the system 
 */
router.put('/signout', async function(req, res) {

    //get the user document
    const curid = req.user.staffID;
    var user = await Staff.findOne({'staffID': curid});

    if(!user){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
    }

    //now
    var curDateTime = new Date();

    //curDateTime but with time set to 00:00
    var curDate =  new Date();
    curDate.setUTCHours(0,0,0,0);

    //get the today's date attendance from the array
    const curAtt = user.attendance.find(elem => +elem.date == +curDate);


    if(!curAtt){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "attendance record not found"});
    }

    //user cannot sign out twice without signing out in between 
    if(curAtt.signIn.length <= curAtt.signOut.length){
        return res.status(HTTP_CODES.BAD_REQUEST).json({msg: "you are not signed in"});
    }
    
    //register user signout
    curAtt.signOut.push(curDateTime);

    //update the user document
    await user.save();

    return res.status(HTTP_CODES.OK).json({msg: 'successful sign out on '+ curDateTime});
});

/**
 * return a user's attendance records
 * @param month is the number of the month we wish to filter by (1-12)
 */
router.get('/attendance/:month?', async function(req, res) {

    //get the user document
    const curid = req.user.staffID;
    var user = await Staff.findOne({'staffID': curid});

    if(!user){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
    }
    
    //month filter is defined and is between 1 and 12
    var month = req.params.month - 1;

    month = month !== undefined? (month >= 0 && month <= 11? month : undefined) : undefined;

    //get the today's date attendance from the array
    var userAtt = user.attendance;

    //filter by month
    if(month !== undefined)
        userAtt = userAtt.filter(elem => elem.date.getMonth() == month);

    //array of sign in dates and their corresponding sign out dates [{signIn: Date, signOut: Date}]
    var signInOut = [];

    //zip sign in and sign out together in signInOut
    userAtt.forEach(attDay => {
        signInOut = signInOut.concat(attDay.signIn.map((elem, indx) => {

            //sign in without a sign out
            if(indx >=  attDay.signOut.length)
                return undefined;

            return {
                signIn: elem,
                signOut: attDay.signOut[indx]
            }
        }));
    });
    //remove the undefined element corresponding to a sign in without a sign out
    if(!signInOut[signInOut.length - 1]){
        signInOut.pop();
    }

    return res.status(HTTP_CODES.OK).send(signInOut);
});

module.exports = router;