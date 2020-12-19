//------------------------------------------------DEPENDENCIES--------------------------------------
var express = require('express');
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const { authenticateAndAuthoriseAC } = require('./auth.js');

//-----------------------------------------------END OF DEPENDENCIES----------------------------



//----------------------------------------ENUMS----------------------------------------------------


//----------------------------------END OF ENUMS-------------------------------------------------




//--------------------------------------MODELS----------------------------------------------------

const Staff = require('../mongoose/dao/staff.js');


//---------------------------------END OF MODELS--------------------------------------------------



//---------------------------------------ACADEMIC STAFF FUNCTIONALITIES-------------------------------------------------

router.get('/schedule', authenticateAndAuthorise)

//-------------------------------------END OF ACADEMIC FUNCTIONALITIES---------------------------------------------


module.exports = router;