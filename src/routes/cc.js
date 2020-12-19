//------------------------------------------------DEPENDENCIES--------------------------------------
var express = require('express');
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const { authenticateAndAuthorise } = require('./auth.js');

//-----------------------------------------------END OF DEPENDENCIES----------------------------

//----------------------------------------ENUMS----------------------------------------------------

const WEEKDAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

const SLOTNUMS = ["First", "Second", "Third", "Fourth", "Fifth"];

//----------------------------------END OF ENUMS-------------------------------------------------


//--------------------------------------MODELS----------------------------------------------------

const Staff = require('../mongoose/dao/staff.js');
const Request = require('../mongoose/dao/request.js');
const Slot = require('../mongoose/dao/slot.js');
const LinkingSlot = require('../mongoose/dao/linkingSlot.js');
const Notification = require('../mongoose/dao/notification.js');
const Course = require('../mongoose/dao/course.js');
const Location = require('../mongoose/dao/location.js');

//---------------------------------END OF MODELS--------------------------------------------------

//---------------------------------------COURSE COORDINATOR FUNCTIONALITIES-------------------------------------------------

//show slot linking notifications route
router.get('/slot-linking-notifications', authenticateAndAuthorise("Course Coordinator"), async (req, res) => {
    try
    {
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;

    //get the notifications of the user
    const notifs = (await Staff.findOne({ staffID: user.staffID })).notifications;

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
    catch(error)
    {
        res.status(500).json({ msg: error.message });
    }
}
);

//accept a slot linking request route
router.post('/slot-linking-notifications/accept', authenticateAndAuthorise("Course Coordinator"), async (req, res) =>
{
    try
    {
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;
    
    //gets the request objectID of the request accepted
    const { requestID }= req.body;

    //if no request id entered
    if(!requestID)
        return res.status(400).json( { msg: "Please enter the request id of the request you want to accept." } );

    //get the request to be accepted from the database
    const request = await Request.findOne( { _id: requestID });

    //if there is no such request
    if(!request)
        return res.status(404).json( { msg: "There is no request with the id given."} );


    //get the objectId of the staff
    const staffID = (await Staff.findOne( { staffID: user.staffID } ) )._id;


    //if the request entered is not slot-linking request
    if(!request.linkingSlot)
        return res.status(400).json( { msg: "Request entered is not a slot linking request."} );

     //if the request is not directed towards the current user
    if(request.receiverID !== staffID)
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
    const requestSender = await Staff.findOne( { staffID: request.senderID } );

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

     
    //reject the other (_id !== requestID) linking slot requests associated with the slot
    await Request.update( { linkingSlot: { slot: { _id: slot._id } }, _id: { $ne: requestID } },
                        {
                            status: "Rejected", responseDate: Date.now()
                        } );

    //set the response date and status of the request accepted
    request.responseDate = Date.now();
    request.status = "Accepted";

    await request.save();

    return res.status(200).json( {msg: "Slot linking accepted."} );
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message });
    }
}
);

//reject a slot linking request route
router.post('/slot-linking-notifications/reject',authenticateAndAuthorise("Course Coordinator"), async (req, res) =>
{
    try
    {
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;
    
    //gets the request objectID of the request rejected
    const { requestID }= req.body;

    //if no request id entered
    if(!requestID)
        return res.status(400).json( { msg: "Please enter the request id of the request you want to reject." } );

    //get the request to be rejected from the database
    const request = await Request.findOne( { _id: requestID });
    
     //if there is no such request
     if(!request)
        return res.status(404).json( { msg: "There is no request with the id given."} );

    //get the objectId of the staff
    const staffID = (await Staff.findOne( { staffID: user.staffID } ) )._id;


    //if the request entered is not slot-linking request
    if(!request.linkingSlot)
        return res.status(400).json( { msg: "Request entered is not a slot linking request."} );

     //if the request is not directed towards the current user
    if(request.receiverID !== staffID)
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
    catch(error)
    {
        res.status(500).json({ msg: error.message });
    }

}
);

//add a slot of the course coordinated by the cc
router.post('/course-slot/add', authenticateAndAuthorise("Course Coordinator"), async (req, res) => 
{
    try
    {
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;

    //get the attributes of the slot to be added
    const {weekday, slotNum, locationId} = req.body;


    
    //if one of the details was missing
    if( !weekday || !slotNum || !locationId )
        return res.status(400).json( { msg: "Please enter weekday, slot number and location id to add a new slot." } );

    //weekday entered is of the wrong format
    if(!WEEKDAYS.includes(weekday))
        return res.status(400).json( { msg: "Please enter weekday as one of the following formats: " + WEEKDAYS } );

    //if slot number is of the wrong format
    if(!SLOTNUMS.includes(slotNum))
        return res.status(400).json( { msg: "Please enter slot number as one of the following formats: " + SLOTNUMS } );
    
    //if location id does not exist
    if(!(await Location.findOne( {_id: locationId} ) ) )
        return res.status(400).json( { msg: "There is no location with the id entered." } );



    //check if the location is already reserved during the chosen time (search for a slot already in the table with the same location and time)
    const intersectingSlot = await Slot.find( {weekday: weekday, number: slotNum, location: locationId} );

    //if the location is already taken during the chosen time by a slot
    if(intersectingSlot)
        return res.status(400).json( { msg: "Location chosen is already taken by a slot." } );

    //get the record of the course coordinator
    //populate the courses of the coordinator 
    //populate the coordinators of those courses
    //returns the courses attributed to the cc with their respective coordinator records
    const courses =  (await Staff
                                .findOne( {staffID: user.staffID} )  
                                .populate({
                                    path: "courseIDs",
                                    populate: {
                                        path: "coordinatorID"
                                    }
                                })).courseIDs;

    //get the course coordinated by the coordinator
    const courseCoordinated = courses.filter( (course) =>
    {
        course.coordinatorID.staffID === user.staffID;
    });


    //add the slot to the slot table
    await Slot.create( { weekday: weekday, number: slotNum, location: locationId, course: courseCoordinated._id } );


    //add the slot to the course table
    const slot =  await Slot.findOne( { weekday: weekday, number: slotNum, location: locationId } );
    courseCoordinated.slots.push(slot._id);
    await courseCoordinated.save();

    return res.status(200).json( { msg: "Slot added", slot: slot } );

    }
    catch(error)
    {
        res.status(500).json({ msg: error.message });
    }

}
);

//delete a slot of the course coordinated by the cc
router.delete('/course-slot/delete', authenticateAndAuthorise("Course Coordinator"), async (req, res) => 
{
    try
    {
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;

    //get the id of the slot to be deleted
    const { slotId } = req.body;

    //if there was no slot id entered
    if( !slotId )
        return res.status(400).json( { msg: "Please enter the slot id of the slot to be deleted." } );


    //if there is no such slot
    const slot = await Slot.findOne( {_id: slotId } );
    if(!slot)
        return res.status(400).json( { msg: "There is no slot with the id given." } );


    
    //if the slot is not for the course assigned to the cc

    //get the record of the course coordinator
    //populate the courses of the coordinator 
    //populate the the coordinators of those courses
    //returns the courses attributed to the cc with their respective coordinator records
    const courses =  (await Staff
                                .findOne( {staffID: user.staffID} )  
                                .populate({
                                    path: "courseIDs",
                                    populate: {
                                        path: "coordinatorID"
                                    }
                                })).courseIDs;
    //get the course coordinated by the coordinator
    const courseCoordinated = courses.filter( (course) =>
    {
        course.coordinatorID.staffID === user.staffID;
    });
    //if the slot's course is not the course coordinated by the cc
    if(courseCoordinated._id !== slot.course)
        return res.status(400).json( { msg: "Slot is assigned to a course coordinated by another coordinator." } );

    

    //A)remove from slot table
    await Slot.deleteOne( { _id: slotId } );



    //B)if the slot is already taken by a staff => remove from schedule

    //get the staff that takes the course coordinated by cc and has the slot in the schedule
    //remove the slot from the schedule if it shares the same id as the slot to be removed
    await Staff.findOneAndUpdate( { courseIDs: courseCoordinated._id, schedule: { _id: slotId } },
                                  { 
                                      $pull : { schedule: { _id: slotId } }
                                  });
    
    

    //C)delete linking slot requests attributed to that slot

    //gets array of objectIds of linking slot requests related to that slot
    const LSid = (await LinkingSlot.find( { slot : slotId }))._id;

    //delete these linking slot requests from the linking slot table
    await LinkingSlot.deleteMany( { _id : { $in: LSid } } );

    //gets the array of objectIds of requests linked to the linking slot request of the deleted slot
    //const RQid = (await Request.find( { linkingSlot: { _id: { $in: LSid } } } ) )._id;
    const {RQid, SenderID, ReceiverID} = await Request.find( { linkingSlot: { _id: { $in: LSid } } }, {"senderID" : 1, "receiverID" : 1} );

    //delete these requests from the requests table
    await Request.deleteMany( { _id: { $in: RQid } } );

    //gets the array of objectIds of notifications linked to the linking slot request of the slot to be deleted
    const NFid = (await Notification.find( { message: { _id: { $in: RQid } } } ) )._id;

    //delete those notifications from the notifications table
    await Notification.deleteMany( { _id: { $in: NFid } } );

    //delete those notifications from those who sent them and received them
    await Staff.update( { $or: [ { _id: { $in: SenderID} }, { _id: { $in: ReceiverID} } ] },
                        {  
                            $pull: { notifications: { _id: { $in: NFid } } }  
                        },
                        { multi: true }
                      );


    

    //D)delete from course table

    await Course.findOneAndUpdate( { _id: slot.course },
                                   {
                                      $pull: { slots: { _id: slotId } }
                                   });


    return res.status(200).json( { msg: "Slot deleted", slot: slot } );

    }
    catch(error)
    {
        res.status(500).json({ msg: error.message });
    }

}
);


//update a slot of the course coordinated by the cc
router.put('/course-slot/update', authenticateAndAuthorise("Course Coordinator"), async (req, res) => 
{
    try
    {
    //gets the payload of the token
    //the payload is stored in req.user in the authentication method
    const user = req.user;

    //get the id of the slot to be updated and the features to be updated
    const { slotId, newWeekday, newSlotNum, newLocationId } = req.body;


    //if there is no slot id entered
    if(!slotId)
        return res.status(400).json( { msg: "Please enter a slot id of the slot to be updated." } );
    
    //if none of the features were entered
    if(!newWeekday && !newSlotNum && !newLocationId)
        return res.status(400).json( { msg: "Please enter at least one of weekday, slot number or location id to update." } );


    //if there is no such slot
    const slot = await Slot.findOne( {_id: slotId } );
    if(!slot)
        return res.status(400).json( { msg: "There is no slot with the id given." } );

    //weekday entered is of the wrong format
    if(newWeekday && !WEEKDAYS.includes(newWeekday))
        return res.status(400).json( { msg: "Please enter weekday as one of the following formats: " + WEEKDAYS } );

    //if slot number is of the wrong format
    if(newSlotNum && !SLOTNUMS.includes(slotNum))
        return res.status(400).json( { msg: "Please enter slot number as one of the following formats: " + SLOTNUMS } );
 
    //if location id does not exist
    if(newLocationId && !(await Location.findOne( {_id: locationId} ) ) )
        return res.status(400).json( { msg: "There is no location with the id entered." } );

    
    //if the slot is not for the course assigned to the cc

    //get the record of the course coordinator
    //populate the courses of the coordinator 
    //populate the the coordinators of those courses
    //returns the courses attributed to the cc with their respective coordinator records
    const courses =  (await Staff
                                .findOne( {staffID: user.staffID} )  
                                .populate({
                                    path: "courseIDs",
                                    populate: {
                                        path: "coordinatorID"
                                    }
                                })).courseIDs;
    //get the course coordinated by the coordinator
    const courseCoordinated = courses.filter( (course) =>
    {
        course.coordinatorID.staffID === user.staffID;
    });
    //if the slot's course is not the course coordinated by the cc
    if(courseCoordinated._id !== slot.course)
        return res.status(400).json( { msg: "Slot is assigned to a course coordinated by another coordinator." } );


    //TODO: check if the update parameters are different and if not send  a message

    //if cc entered a new location id
    if(newLocationId)
        const locationId = newLocationId;
    else
        const locationId = slot.location;

    //if cc enterd a new weekday
    if(newWeekday)
        const weekday = newWeekday;
    else
        const weekday = slot.weekday;

    //if cc entered a new slot number
    if(newSlotNum)
        const slotNum = newSlotNum;
    else
        const slotNum = slot.number;

    
    //check for location contradictions

    //check if the location is already reserved during the chosen time (search for a slot already in the table with the same location and time)
    const intersectingSlot = await Slot.findOne( {weekday: weekday, number: slotNum, location: locationId} );

    //if the location is already taken during the chosen time by a slot
    if(intersectingSlot)
        return res.status(400).json( { msg: "Location chosen is already taken by a slot." } );
    



    //A)update in slot table
    await Slot.findOneAndUpdate( { _id: slotId },
                                 { weekday: weekday, number: slotNum, location: locationId } );



    //B)if the slot is already taken by a staff => remove in schedule (as the slot has changed)

    //get the staff that takes the course coordinated by cc and has the slot in the schedule
    //remove the slot from the schedule if it shares the same id as the slot to be removed
    await Staff.findOneAndUpdate( { courseIDs: courseCoordinated._id , schedule: { _id: slotId } },
                                  { 
                                      $pull : { schedule: { _id: slotId } }
                                  });
    
    

    //C)delete linking slot requests attributed to that slot (as the slot has changed)

    //gets array of objectIds of linking slot requests related to that slot
    const LSid = (await LinkingSlot.find( { slot : slotId }))._id;

    //delete these linking slot requests from the linking slot table
    await LinkingSlot.deleteMany( { _id : { $in: LSid } } );

    //gets the array of objectIds of requests linked to the linking slot request of the deleted slot
    //const RQid = (await Request.find( { linkingSlot: { _id: { $in: LSid } } } ) )._id;
    const {RQid, SenderID, ReceiverID} = await Request.find( { linkingSlot: { _id: { $in: LSid } } }, {"senderID" : 1, "receiverID" : 1} );

    //delete these requests from the requests table
    await Request.deleteMany( { _id: { $in: RQid } } );

    //gets the array of objectIds of notifications linked to the linking slot request of the slot to be deleted
    const NFid = (await Notification.find( { message: { _id: { $in: RQid } } } ) )._id;

    //delete those notifications from the notifications table
    await Notification.deleteMany( { _id: { $in: NFid } } );

    //delete those notifications from those who sent them and received them
    await Staff.update( { $or: [ { _id: { $in: SenderID} }, { _id: { $in: ReceiverID} } ] },
                        {  
                            $pull: { notifications: { _id: { $in: NFid } } }  
                        },
                        { multi: true }
                      );


    

    //D)update in course table

    await Course.findOneAndUpdate( { _id: slot.course, slots:  { _id: slotId } },
                                   {
                                        $set: { "slots.$.weekday" : weekday },
                                        $set: { "slots.$.number" : slotNum },
                                        $set: { "slots.$.location" : locationId }
                                   } );


    return res.status(200).json( { msg: "Slot updated", slot: slot } );

    }
    catch(error)
    {
        res.status(500).json({ msg: error.message });
    }

}
);


//-------------------------------------END OF COURSE COORDINATOR FUNCTIONALITIES---------------------------------------------


module.exports = router;