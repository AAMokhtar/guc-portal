var express = require('express');
var router = express.Router();

const HTTP_CODES = require('./r_util/httpCodes');
const bcrypt = require("bcryptjs");



//=====================:-MODELS-:======================
const Staff = require('../mongoose/dao/staff.js');
const Request = require('../mongoose/dao/request.js');
const LinkingSlot = require('../mongoose/dao/linkingSlot.js');
const Leave = require('../mongoose/dao/leave.js');
const DayOff = require('../mongoose/dao/dayOff.js');
const Replacement = require('../mongoose/dao/replacement.js');

//=====================:-ROUTES-:======================
/**
 * fetch current user from the database
 */
router.get('/myprofile', function(req, res) {
    return res.status(200).send(req.user); 
});


/**
 * update a user's info. 
 * NOTE: academic members can’t update their salary, faculty and department.
 * req.body contains the updated user 
 */
router.put('/updateprofile', async function(req, res) {

    var updatedUser = req.body;
    const curid = req.user.id;

    //id and name should not be updated so 
    //we remove them in case they are provided
    delete updatedUser['id'];
    delete updatedUser['name'];

    //is the current user in HR?
    const isHR = curid.startsWith('h');

    //academic members cannot update their salary, faculty, department
    if(!isHR){
        delete updatedUser['salary'];
        delete updatedUser['facultyID'];
        delete updatedUser['departmentID'];
    }

    //update the document having curid with the info in updateduser;
    const user = await Staff.findByIdAndUpdate(curid, updatedUser, {new: true});

    //undefined document --> not found
    if(!user){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
    }
    
    return res.status(HTTP_CODES.OK).send(user);
});

/**
 * Reset a user's password
 * req.body contains {'curPassword': val , 'newPassword': val}
 */
router.put('/resetpassword', async function(req, res) {

    const curid = req.user.id;
    var user = await Staff.findById(req.user.id);

    //current password(entered in body) matches the existing one
    const curPassMatch = await bcrypt.compare(req.body.curPassword, user.password);

    if(!curPassMatch){
        res.status(HTTP_CODES.BAD_REQUEST).json({msg: 'Current password is incorrect'});
    }

    //new password(entered in body) matches the existing one
    const newPassMatch = await bcrypt.compare(req.body.newPassword, user.password);

    if(newPassMatch){
        res.status(HTTP_CODES.BAD_REQUEST).json({msg: 'New password cannot be the same as the current password'});
    }

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const newPassHashed = await bcrypt.hash(req.body.newPassword, salt);

    //update the user document
    user.password = newPassHashed;
    await user.save();


    return res.status(HTTP_CODES.OK).send(user);
});

/**
 * update a user's info. 
 * NOTE: academic members can’t update their salary, faculty and department.
 * req.body contains the updated user 
 */
router.put('/updateprofile', async function(req, res) {

    var updatedUser = req.body;
    const curid = req.user.id;

    //id and name should not be updated so 
    //we remove them in case they are provided
    delete updatedUser['id'];
    delete updatedUser['name'];

    //is the current user in HR?
    const isHR = curid.startsWith('h');

    //academic members cannot update their salary, faculty, department
    if(!isHR){
        delete updatedUser['salary'];
        delete updatedUser['facultyID'];
        delete updatedUser['departmentID'];
    }

    //update the document having curid with the info in updateduser;
    const user = await Staff.findByIdAndUpdate(curid, updatedUser, {new: true});

    //undefined document --> not found
    if(!user){
        return res.status(HTTP_CODES.NOT_FOUND).json({msg: "user not found"});
    }
    
    return res.status(HTTP_CODES.OK).send(user);
});

/**
 * Reset a user's password
 * req.body contains {'curPassword': val , 'newPassword': val}
 */
router.put('/resetpassword', async function(req, res) {

    const curid = req.user.id;
    var user = await Staff.findById(req.user.id);

    //current password(entered in body) matches the existing one
    const curPassMatch = await bcrypt.compare(req.body.curPassword, user.password);

    if(!curPassMatch){
        res.status(HTTP_CODES.BAD_REQUEST).json({msg: 'Current password is incorrect'});
    }

    //new password(entered in body) matches the existing one
    const newPassMatch = await bcrypt.compare(req.body.newPassword, user.password);

    if(newPassMatch){
        res.status(HTTP_CODES.BAD_REQUEST).json({msg: 'New password cannot be the same as the current password'});
    }

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const newPassHashed = await bcrypt.hash(req.body.newPassword, salt);

    //update the user document
    user.password = newPassHashed;
    await user.save();

    
    return res.status(HTTP_CODES.OK).send(user);
});

/**
 * Sign a user into the system 
 */
// router.put('/signin', async function(req, res) {

// });

module.exports = router;