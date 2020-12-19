//------------------------------------------------DEPENDENCIES--------------------------------------
var express = require("express");
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const { authenticateAndAuthorise } = require("./auth.js");

const { authenticateAndAuthoriseAC } = require("./auth.js");

//-----------------------------------------------END OF DEPENDENCIES----------------------------

//----------------------------------------ENUMS----------------------------------------------------

//----------------------------------END OF ENUMS-------------------------------------------------

//--------------------------------------MODELS----------------------------------------------------

const Staff = require("../mongoose/dao/staff.js");

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

        //get the schedule of current user
        const schedule = (await Staff.findOne( { _id: user.objectID } ) ).schedule;

        //arrays to store the slots
        let sat, sun, mon, tue, wed, thu;

        //sort the schedule
        schedule.forEach( (slot)  => {

            if(slot.weekday === "Saturday")
            {
                if(slot.number === "First")
                {
                    sat.first = slot;
                }
                else if(slot.number === "Second")
                {
                    sat.second = slot;
                }
                else if(slot.number === "Third")
                {
                    sat.third = slot;
                }
                else if(slot.number === "Fourth")
                {
                    sat.fourth = slot;
                }
                else if(slot.number === "Fifth")
                {
                    sat.fifth = slot;
                }
            }
            else if(slot.weekday === "Sunday")
            {
                if(slot.number === "First")
                {
                    sun.first = slot;
                }
                else if(slot.number === "Second")
                {
                    sun.second = slot;
                }
                else if(slot.number === "Third")
                {
                    sun.third = slot;
                }
                else if(slot.number === "Fourth")
                {
                    sun.fourth = slot;
                }
                else if(slot.number === "Fifth")
                {
                    sun.fifth = slot;
                }
            }
            else if(slot.weekday === "Monday")
            {
                if(slot.number === "First")
                {
                    mon.first = slot;
                }
                else if(slot.number === "Second")
                {
                    mon.second = slot;
                }
                else if(slot.number === "Third")
                {
                    mon.third = slot;
                }
                else if(slot.number === "Fourth")
                {
                    mon.fourth = slot;
                }
                else if(slot.number === "Fifth")
                {
                    mon.fifth = slot;
                }
            }
            else if(slot.weekday === "Tuesday")
            {
                if(slot.number === "First")
                {
                    tue.first = slot;
                }
                else if(slot.number === "Second")
                {
                    tue.second = slot;
                }
                else if(slot.number === "Third")
                {
                    tue.third = slot;
                }
                else if(slot.number === "Fourth")
                {
                    tue.fourth = slot;
                }
                else if(slot.number === "Fifth")
                {
                    tue.fifth = slot;
                }
            }
            else if(slot.weekday === "Wednesday")
            {
                if(slot.number === "First")
                {
                    wed.first = slot;
                }
                else if(slot.number === "Second")
                {
                    wed.second = slot;
                }
                else if(slot.number === "Third")
                {
                    wed.third = slot;
                }
                else if(slot.number === "Fourth")
                {
                    wed.fourth = slot;
                }
                else if(slot.number === "Fifth")
                {
                    wed.fifth = slot;
                }
            }
            else if(slot.weekday === "Thursday")
            {
                if(slot.number === "First")
                {
                    thu.first = slot;
                }
                else if(slot.number === "Second")
                {
                    thu.second = slot;
                }
                else if(slot.number === "Third")
                {
                    thu.third = slot;
                }
                else if(slot.number === "Fourth")
                {
                    thu.fourth = slot;
                }
                else if(slot.number === "Fifth")
                {
                    thu.fifth = slot;
                }
            }
        });
        
        //fill empty slots
        if(!sat.first)
            sat.first = "Free";
        if(!sat.second)
            sat.second = "Free";
        if(!sat.third)
            sat.third = "Free";
        if(!sat.fourth)
            sat.fourth = "Free";
        if(!sat.fifth)
            sat.fifth = "Free";
        
        if(!sun.first)
            sun.first = "Free";
        if(!sun.second)
            sun.second = "Free";
        if(!sun.third)
            sun.third = "Free";
        if(!sun.fourth)
            sun.fourth = "Free";
        if(!sun.fifth)
            sun.fifth = "Free";
        
        if(!mon.first)
            mon.first = "Free";
        if(!mon.second)
            mon.second = "Free";
        if(!mon.third)
            mon.third = "Free";
        if(!mon.fourth)
            mon.fourth = "Free";
        if(!mon.fifth)
            mon.fifth = "Free";
        
        if(!tue.first)
            tue.first = "Free";
        if(!tue.second)
            tue.second = "Free";
        if(!tue.third)
            tue.third = "Free";
        if(!tue.fourth)
            tue.fourth = "Free";
        if(!tue.fifth)
            tue.fifth = "Free";

        if(!wed.first)
            wed.first = "Free";
        if(!wed.second)
            wed.second = "Free";
        if(!wed.third)
            wed.third = "Free";
        if(!wed.fourth)
            wed.fourth = "Free";
        if(!wed.fifth)
            wed.fifth = "Free";
        
        if(!thu.first)
            thu.first = "Free";
        if(!thu.second)
            thu.second = "Free";
        if(!thu.third)
            thu.third = "Free";
        if(!thu.fourth)
            thu.fourth = "Free";
        if(!thu.fifth)
            thu.fifth = "Free";


        //add the days together into one object as the  whole schedule
        const sch = { sat: sat, sun: sun, mon: mon, tue: tue, wed: wed, thu: thu };

        //return the schedule
        return res.send(200).json( { schedule: sch })
    }
    catch(error)
    {
        return res.status(500).json( { msg: error.message } );
    }

});


//shows the replacment requests sent to the user
router.get('/replacement-request', authenticateAndAuthoriseAC, async (req, res) =>
{
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;
  
        //get the requests of the user
        const notifs = (await Staff.findOne({ staffID: user.staffID })).notifications;
  
        //filters notifications to get only the replacement ones and return the requests themselves
        let RepReqs;
        notifs.forEach( notif  => {
            //if the notification is replacement and sent to the academic member
            if(notif.message.replacement && notif.message.receiverID === user.objectID)
            {
                //remove the unnecessary attributes 
                let {leave, dayOff, linkingSlot, ...RepReq} = notif.message;
                RepReqs.push(RepReq);
            }
        });
        //if there are slot linking notifications return them to the user
        if (RepReqs.length > 0)
          return res.status(200).json({ requests: RepReqs });
        //otherwise return a message indicating ther is no notification to show
        else
          return res
            .status(200)
            .json({ msg: "There are currently no replacement requests." });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    }
);


//sends a replacment request
router.post('/replacement-request/send', authenticateAndAuthoriseAC, async (req, res) =>
{
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;
  
        //get the requests of the user
        const notifs = (await Staff.findOne({ staffID: user.staffID })).notifications;
  
        //filters notifications to get only the replacement ones and return the requests themselves
        let RepReqs;
        notifs.forEach( notif  => {
            //if the notification is replacement and sent to the academic member
            if(notif.message.replacement && notif.message.receiverID === user.objectID)
            {
                //remove the unnecessary attributes 
                let {leave, dayOff, linkingSlot, ...RepReq} = notif.message;
                RepReqs.push(RepReq);
            }
        });
        //if there are slot linking notifications return them to the user
        if (RepReqs.length > 0)
          return res.status(200).json({ requests: RepReqs });
        //otherwise return a message indicating ther is no notification to show
        else
          return res
            .status(200)
            .json({ msg: "There are currently no replacement requests." });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    }
);


//-------------------------------------END OF ACADEMIC FUNCTIONALITIES---------------------------------------------

module.exports = router;
