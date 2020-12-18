//------------------------------------------------DEPENDENCIES--------------------------------------
var express = require('express');
var router = express.Router();


const { authenticateAndAuthoriseCC } = require('./auth.js');

//-----------------------------------------------END OF DEPENDENCIES----------------------------

//--------------------------------------MODELS----------------------------------------------------

const Staff = require('../mongoose/dao/staff.js');
const Request = require('../mongoose/dao/request.js')

//---------------------------------END OF MODELS--------------------------------------------------

//---------------------------------------COURSE COORDINATOR FUNCTIONALITIES-------------------------------------------------

//show slot linking notifications route
router.get('/slot-linking-notifications', authenticateAndAuthoriseCC, async (req, res) => {
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;

    //get the notifications of the user
    const notifs = await (Staff.findOne({ _id: user.id })).notifications;

    //filters notifications to get only the slot linking ones
    const SLNotifs = notifs.filter( (notif) =>
    {
        notif.message.linkingSlot;
    });

    //if there are slot linking notifications return them to the user
    if(SLNotifs.length > 0)
        return res.status(200).json( {notifications: SLNotifs});
    //otherwise return a message indicating ther is no notification to show
    else
        return res.status(200).json( { msg: "There are currently no slot linking notifications."} );
    
    }
);

//accept a slot linking request route
router.post('/slot-linking-notifications/accept', authenticateAndAuthoriseCC, async (req, res) =>
{
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;
    
    //gets the request objectID of the request accepted
    const { requestID }= req.body;

    //get the request to be accepted from the database
    const request = await Request.findOne( { _id: requestID });



    //if there is no such request
    if(!request)
        return res.status(404).json( { msg: "There is no request with the id given."} );

    //if the request entered is not slot-linking request
    if(!request.linkingSlot)
        return res.status(400).json( { msg: "Request entered is not a slot linking request."} );

     //if the request is not directed towards the current user
    if(request.receiverID !== user.id)
        return res.status(400).json( { msg: "Request entered is not directed to current user."} );

    //if request already received the response (not pending)
    if(request.status !== "Pending")
        return res.status(400).json( { msg: "Request already " + request.status } );

   
    //reaching this point indicates:
    //request exists
    //request is of type linking slot
    //request is directed towards current course coordinator
    //request did not receive a reply yet

    //get the record of the staff to add the slot to
    const requestSender = await Staff.findOne( {_id: request.senderID} );

    //get the slot to be added
    const slot = request.linkingSlot.slot;

    /*
    //TODO: remove this once handled from the sending side
    //get the slot that intersects with the slot to be added
    const intersectingSlot = (requestSender.schedule).filter( (currSlot) =>
    {
        currSlot.weekday === slot.weekday && currSlot.number === slot.number;
    });

    //if there exists an intersecting slot
    if(intersectingSlot)
        return res.json( {msg: "Sender of request already has a slot during this time."} );
    */
    

    //add the slot to the sender's schedule
    //to be sorted when shown
    requestSender.schedule.push(slot);
    await requestSender.save();

    //set the response date and status
    request.responseDate = Date.now();
    request.status = "Accepted";

    await request.save();

    return res.status(200).json( {msg: "Slot linking accepted."} );

}
);

//reject a slot linking request route
router.post('/slot-linking-notifications/reject', authenticateAndAuthoriseCC, async (req, res) =>
{
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;
    
    //gets the request objectID of the request rejected
    const { requestID }= req.body;

    //get the request to be rejected from the database
    const request = await Request.findOne( { _id: requestID });



    //if there is no such request
    if(!request)
        return res.stattus(404).json( { msg: "There is no request with the id given."} );

    //if the request entered is not slot-linking request
    if(!request.linkingSlot)
        return res.status(400).json( { msg: "Request entered is not a slot linking request."} );

     //if the request is not directed towards the current user
    if(request.receiverID !== user.id)
        return res.status(400).json( { msg: "Request entered is not directed to current user."} );

    //if request already received the response (not pending)
    if(request.status !== "Pending")
        return res.status(400).json( { msg: "Request already " + request.status } );

   
    //reaching this point indicates:
    //request exists
    //request is of type linking slot
    //request is directed towards current course coordinator
    //request did not receive a reply yet
    

    //set the response date and status
    request.responseDate = Date.now();
    request.status = "Rejected";

    await request.save();

    return res.status(200).json( {msg: "Slot linking rejected."} );

}
);


router.post('/cc/course/add')


 //-------------------------------------END OF COURSE COORDINATOR FUNCTIONALITIES---------------------------------------------


 module.exports = router;