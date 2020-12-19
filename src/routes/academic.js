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

//shows the schedule
router.get('/schedule', authenticateAndAuthoriseAC, async (req, res) =>
{
    try
    {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        const schedule = (await Staff.findOne( { _id: u } ))
    }
    catch(error)
    {
        return res.status(500).json( { msg: error.message } );
    }

});

//-------------------------------------END OF ACADEMIC FUNCTIONALITIES---------------------------------------------


module.exports = router;