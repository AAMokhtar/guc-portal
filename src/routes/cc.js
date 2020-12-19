//------------------------------------------------DEPENDENCIES--------------------------------------
var express = require("express");
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const { authenticateAndAuthorise } = require("./auth.js");

//-----------------------------------------------END OF DEPENDENCIES----------------------------

//--------------------------------------MODELS----------------------------------------------------

const Staff = require("../mongoose/dao/staff.js");
const Request = require("../mongoose/dao/request.js");
const Slot = require("../mongoose/dao/slot.js");
const LinkingSlot = require("../mongoose/dao/linkingSlot.js");

//---------------------------------END OF MODELS--------------------------------------------------

//---------------------------------------COURSE COORDINATOR FUNCTIONALITIES-------------------------------------------------

//show slot linking notifications route
router.get(
  "/slot-linking-notifications",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //get the notifications of the user
      const notifs = (await Staff.findOne({ staffID: user.staffID }))
        .notifications;

      //filters notifications to get only the slot linking ones
      const SLNotifs = notifs.filter((notif) => {
        notif.message.linkingSlot;
      });

      //if there are slot linking notifications return them to the user
      if (SLNotifs.length > 0)
        return res.status(200).json({ notifications: SLNotifs });
      //otherwise return a message indicating ther is no notification to show
      else
        return res
          .status(200)
          .json({ msg: "There are currently no slot linking notifications." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//accept a slot linking request route
router.post(
  "/slot-linking-notifications/accept",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //gets the request objectID of the request accepted
      const { requestID } = req.body;

      //get the request to be accepted from the database
      const request = await Request.findOne({ _id: requestID });

      //get the objectId of the staff
      const staffID = (await Staff.findOne({ staffID: user.staffID }))._id;

      //if there is no such request
      if (!request)
        return res
          .status(404)
          .json({ msg: "There is no request with the id given." });

      //if the request entered is not slot-linking request
      if (!request.linkingSlot)
        return res
          .status(400)
          .json({ msg: "Request entered is not a slot linking request." });

      //if the request is not directed towards the current user
      if (request.receiverID !== staffID)
        return res
          .status(400)
          .json({ msg: "Request entered is not directed to current user." });

      //if request already received the response (not pending)
      if (request.status !== "Pending")
        return res
          .status(400)
          .json({ msg: "Request already " + request.status });

      //reaching this point indicates:
      //request exists
      //request is of type linking slot
      //request is directed towards current course coordinator
      //request did not receive a reply yet

      //get the record of the staff to add the slot to
      const requestSender = await Staff.findOne({ staffID: request.senderID });

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

      return res.status(200).json({ msg: "Slot linking accepted." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//reject a slot linking request route
router.post(
  "/slot-linking-notifications/reject",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //gets the request objectID of the request rejected
      const { requestID } = req.body;

      //get the request to be rejected from the database
      const request = await Request.findOne({ _id: requestID });

      //get the objectId of the staff
      const staffID = (await Staff.findOne({ staffID: user.staffID }))._id;

      //if there is no such request
      if (!request)
        return res
          .stattus(404)
          .json({ msg: "There is no request with the id given." });

      //if the request entered is not slot-linking request
      if (!request.linkingSlot)
        return res
          .status(400)
          .json({ msg: "Request entered is not a slot linking request." });

      //if the request is not directed towards the current user
      if (request.receiverID !== staffID)
        return res
          .status(400)
          .json({ msg: "Request entered is not directed to current user." });

      //if request already received the response (not pending)
      if (request.status !== "Pending")
        return res
          .status(400)
          .json({ msg: "Request already " + request.status });

      //reaching this point indicates:
      //request exists
      //request is of type linking slot
      //request is directed towards current course coordinator
      //request did not receive a reply yet

      //set the response date and status
      request.responseDate = Date.now();
      request.status = "Rejected";

      await request.save();

      return res.status(200).json({ msg: "Slot linking rejected." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//add a slot of the course coordinated by the cc
router.post(
  "/course-slot/add",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //get the attributes of the slot to be added
      const { weekday, slotNum, locationId } = req.body;

      //check if the location is already reserved during the chosen time (search for a slot already in the table with the same location and time)
      const intersectingSlot = await Slot.find({
        weekday: weekday,
        number: slotNum,
        location: locationId,
      });

      //if the location is already taken during the chosen time by a slot
      if (intersectingSlot)
        return res
          .status(400)
          .json({ msg: "Location chosen is already taken by a slot." });

      //get the record of the course coordinator
      //populate the courses of the coordinator
      //populate the coordinators of those courses
      //returns the courses attributed to the cc with their respective coordinator records
      const courses = (
        await Staff.findOne({ staffID: user.staffID }).populate({
          path: "courseIDs",
          populate: {
            path: "coordinatorID",
          },
        })
      ).courseIDs;

      //get the course coordinated by the coordinator
      const courseCoordinated = courses.filter((course) => {
        course.coordinatorID.staffID === user.staffID;
      });

      //add the slot to the slot table
      await Slot.create({
        weekday: weekday,
        number: slotNum,
        location: locationId,
        course: courseCoordinated._id,
      });

      //add the slot to the course table
      const slot = await Slot.findOne({
        weekday: weekday,
        number: slotNum,
        location: locationId,
      });
      courseCoordinated.slots.push(slot._id);
      await courseCoordinated.save();

      return res.status(200).json({ msg: "Slot added", slot: slot });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//delete a slot of the course coordinated by the cc
router.delete(
  "/course-slot/delete",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //get the id of the slot to be deleted
      const { slotId } = req.body;

      //if there is no such slot
      const slot = await Slot.findOne({ _id: slotId });
      if (!slot)
        return res
          .status(400)
          .json({ msg: "There is no slot with the id given." });

      //if the slot is not for the course assigned to the cc

      //get the record of the course coordinator
      //populate the courses of the coordinator
      //populate the the coordinators of those courses
      //returns the courses attributed to the cc with their respective coordinator records
      const courses = (
        await Staff.findOne({ staffID: user.staffID }).populate({
          path: "courseIDs",
          populate: {
            path: "coordinatorID",
          },
        })
      ).courseIDs;
      //get the course coordinated by the coordinator
      const courseCoordinated = courses.filter((course) => {
        course.coordinatorID.staffID === user.staffID;
      });
      //if the slot's course is not the course coordinated by the cc
      if (courseCoordinated._id !== slot.course)
        return res.status(400).json({
          msg:
            "Slot is assigned to a course coordinated by another coordinator.",
        });

      //remove from slot table
      await Slot.deleteOne({ _id: slotId });

      //if the slot is already taken by a staff => remove from schedule

      //get the staff that takes the course coordinated by cc
      //remove the slot from the schedule if it shares the same id as the slot to be removed
      await Staff.update(
        { courseIDs: courseCoordinated._id },
        {
          $pull: { "schedule._id": slotId },
        },
        { multi: true }
      );

      //delete linking slot requests attributed to that slot

      const LSid = LinkingSlot.findOne({ slot: slotId });

      //   await
      //course slot also

      //add the slot to the slot table
      slot = {
        weekday: weekday,
        number: slotNum,
        location: locationId,
        course: courseCoordinated._id,
      };
      Slot.create(slot);

      return res.status(200).json({ msg: "Slot added", slot: slot });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//-------------------------------------END OF COURSE COORDINATOR FUNCTIONALITIES---------------------------------------------

module.exports = router;
