//------------------------------------------------DEPENDENCIES--------------------------------------
var express = require("express");
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const { authenticateAndAuthorise } = require("./auth.js");

//-----------------------------------------------END OF DEPENDENCIES----------------------------

//----------------------------------------ENUMS----------------------------------------------------

const WEEKDAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];

const SLOTNUMS = ["First", "Second", "Third", "Fourth", "Fifth"];

//----------------------------------END OF ENUMS-------------------------------------------------

//--------------------------------------MODELS----------------------------------------------------

const Staff = require("../models/staff.js");
const Request = require("../models/request.js");
const Slot = require("../models/slot.js");
const LinkingSlot = require("../models/linkingSlot.js");
const Replacement = require("../models/replacement");
const Notification = require("../models/notification.js");
const Course = require("../models/course.js");
const Location = require("../models/location.js");
const { NotImplemented } = require("http-errors");
const { findOne } = require("../models/staff.js");

//---------------------------------END OF MODELS--------------------------------------------------

//--------------------------------------Extra Routes------------------------------------------------

router.get(
  "/get-slots",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //get the record of the course coordinator
      //populate the courses of the coordinator
      const courses = (
        await Staff.findOne({ staffID: user.staffID }).populate({
          path: "courseIDs",
        })
      ).courseIDs;

      //get the course coordinated by the coordinator
      let courseCoordinated;
      for (i = 0; i < courses.length; i++) {
        let ccID = courses[i].coordinatorID;
        if (ccID && ccID.equals(user.objectID)) courseCoordinated = courses[i];
      }

      //get the slots of the course
      const { slots } = await Course.findById(courseCoordinated).populate({
        path: "slots",
      });

      //sort the slots

      //arrays to store the slots
      let sat = { first: [], second: [], third: [], fourth: [], fifth: [] };
      let sun = { first: [], second: [], third: [], fourth: [], fifth: [] };
      let mon = { first: [], second: [], third: [], fourth: [], fifth: [] };
      let tue = { first: [], second: [], third: [], fourth: [], fifth: [] };
      let wed = { first: [], second: [], third: [], fourth: [], fifth: [] };
      let thu = { first: [], second: [], third: [], fourth: [], fifth: [] };

      //sort the slots
      slots.forEach((slot) => {
        if (slot.weekday === "Saturday") {
          if (slot.number === "First") {
            sat.first.push(slot);
          } else if (slot.number === "Second") {
            sat.second.push(slot);
          } else if (slot.number === "Third") {
            sat.third.push(slot);
          } else if (slot.number === "Fourth") {
            sat.fourth.push(slot);
          } else if (slot.number === "Fifth") {
            sat.fifth.push(slot);
          }
        } else if (slot.weekday === "Sunday") {
          if (slot.number === "First") {
            sun.first.push(slot);
          } else if (slot.number === "Second") {
            sun.second.push(slot);
          } else if (slot.number === "Third") {
            sun.third.push(slot);
          } else if (slot.number === "Fourth") {
            sun.fourth.push(slot);
          } else if (slot.number === "Fifth") {
            sun.fifth.push(slot);
          }
        } else if (slot.weekday === "Monday") {
          if (slot.number === "First") {
            mon.first.push(slot);
          } else if (slot.number === "Second") {
            mon.second.push(slot);
          } else if (slot.number === "Third") {
            mon.third.push(slot);
          } else if (slot.number === "Fourth") {
            mon.fourth.push(slot);
          } else if (slot.number === "Fifth") {
            mon.fifth.push(slot);
          }
        } else if (slot.weekday === "Tuesday") {
          if (slot.number === "First") {
            tue.first.push(slot);
          } else if (slot.number === "Second") {
            tue.second.push(slot);
          } else if (slot.number === "Third") {
            tue.third.push(slot);
          } else if (slot.number === "Fourth") {
            tue.fourth.push(slot);
          } else if (slot.number === "Fifth") {
            tue.fifth.push(slot);
          }
        } else if (slot.weekday === "Wednesday") {
          if (slot.number === "First") {
            wed.first.push(slot);
          } else if (slot.number === "Second") {
            wed.second.push(slot);
          } else if (slot.number === "Third") {
            wed.third.push(slot);
          } else if (slot.number === "Fourth") {
            wed.fourth.push(slot);
          } else if (slot.number === "Fifth") {
            wed.fifth.push(slot);
          }
        } else if (slot.weekday === "Thursday") {
          if (slot.number === "First") {
            thu.first.push(slot);
          } else if (slot.number === "Second") {
            thu.second.push(slot);
          } else if (slot.number === "Third") {
            thu.third.push(slot);
          } else if (slot.number === "Fourth") {
            thu.fourth.push(slot);
          } else if (slot.number === "Fifth") {
            thu.fifth.push(slot);
          }
        }
      });

      //add the days together into one object as the  whole schedule
      const result = {
        sat: sat,
        sun: sun,
        mon: mon,
        tue: tue,
        wed: wed,
        thu: thu,
      };

      return res
        .status(200)
        .json({ courseSlots: result, course: courseCoordinated });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//-----------------------------------------------------------------------------------------------------

//---------------------------------------COURSE COORDINATOR FUNCTIONALITIES-------------------------------------------------

//show slot linking notifications route
router.get(
  "/slot-linking-request",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //get the notifications of the user
      const notifs = (await Staff.findOne({ staffID: user.staffID }))
        .notifications;

      //filters notifications to get only the slot linking ones and return the requests themselves
      let SLReqs = [];
      notifs.forEach((notif) => {
        //if the notification is linking slot and sent to the cc
        if (
          notif.message.linkingSlot &&
          notif.message.receiverID.equals(user.objectID)
        ) {
          //remove the unnecessary attributes
          let { leave, dayOff, replacement, ...SLReq } = notif.message;
          SLReqs.push(SLReq);
        }
      });

      const result = SLReqs.map((a) => a.$__parent);

      //if there are slot linking requests return them to the user
      if (result && result.length > 0) {
        return res.status(200).json({ requests: result });
      }
      //otherwise return a message indicating ther is no notification to show
      else
        return res
          .status(200)
          .json({ msg: "There are currently no slot linking requests." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//accept a slot linking request route
router.post(
  "/slot-linking-request/accept",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //gets the request objectID of the request accepted
      const { requestID } = req.body;

      //if no request id entered
      if (!requestID)
        return res.status(400).json({
          msg: "Please enter the request id of the request you want to accept.",
        });

      //get the request to be accepted from the database
      const request = await Request.findOne({ _id: requestID });

      //if there is no such request
      if (!request)
        return res
          .status(404)
          .json({ msg: "There is no request with the id given." });

      //get the objectId of the staff
      const staffID = user.objectID;

      //if the request entered is not slot-linking request
      if (!request.linkingSlot)
        return res
          .status(400)
          .json({ msg: "Request entered is not a slot linking request." });

      //if the request is not directed towards the current user
      if (!request.receiverID.equals(staffID))
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
      const requestSender = await Staff.findById(request.senderID);

      //get the slot to be added
      const slot = request.linkingSlot.slot;

      //add the staff ID to the slot in slot table
      await Slot.findByIdAndUpdate(slot._id, {
        $set: { staffID: requestSender.staffID },
      });

      //add the slot to the sender's schedule
      //to be sorted when shown
      requestSender.schedule.push(slot);
      await requestSender.save();

      //reject the other (_id !== requestID) linking slot requests associated with the slot
      //need to propagate to notifications and sender and receiver

      const otherReqs = await Request.find({
        "linkingSlot.slot._id": slot._id,
        _id: { $ne: requestID },
      });

      otherReqs.forEach(async (rq) => {
        await Request.findByIdAndUpdate(
          rq._id,
          {
            status: "Rejected",
            responseDate: Date.now(),
          },
          { new: true },
          async (err, r) => {
            if (err) throw err;

            await Notification.findOneAndUpdate(
              { "message._id": r._id },
              { $set: { message: r } },
              { new: true },
              async (err, n) => {
                if (err) throw err;

                await Staff.findOneAndUpdate(
                  { _id: r.senderID, "notifications._id": n._id },
                  {
                    $set: { "notifications.$": n },
                  }
                );

                await Staff.findOneAndUpdate(
                  { _id: r.receiverID, "notifications._id": n._id },
                  {
                    $set: { "notifications.$": n },
                  }
                );
              }
            );
          }
        );
      });

      //set the response date and status of the request accepted
      //propagate to notification and sender and receiver

      await Request.findByIdAndUpdate(
        request._id,
        {
          status: "Accepted",
          responseDate: Date.now(),
        },
        { new: true },
        async (err, r) => {
          if (err) throw err;

          await Notification.findOneAndUpdate(
            { "message._id": r._id },
            { $set: { message: r } },
            { new: true },
            async (err, n) => {
              if (err) throw err;

              await Staff.findOneAndUpdate(
                { _id: requestSender._id, "notifications._id": n._id },
                {
                  $set: { "notifications.$": n },
                }
              );

              await Staff.findOneAndUpdate(
                { _id: r.receiverID, "notifications._id": n._id },
                {
                  $set: { "notifications.$": n },
                }
              );
            }
          );
        }
      );

      return res.status(200).json({ msg: "Slot linking accepted." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//reject a slot linking request route
router.post(
  "/slot-linking-request/reject",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //gets the request objectID of the request rejected
      const { requestID } = req.body;

      //if no request id entered
      if (!requestID)
        return res.status(400).json({
          msg: "Please enter the request id of the request you want to reject.",
        });

      //get the request to be rejected from the database
      const request = await Request.findOne({ _id: requestID });

      //if there is no such request
      if (!request)
        return res
          .status(404)
          .json({ msg: "There is no request with the id given." });

      //get the objectId of the staff
      const staffID = (await Staff.findOne({ staffID: user.staffID }))._id;

      //if the request entered is not slot-linking request
      if (!request.linkingSlot)
        return res
          .status(400)
          .json({ msg: "Request entered is not a slot linking request." });

      //if the request is not directed towards the current user
      if (!request.receiverID.equals(staffID))
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

      await Request.findByIdAndUpdate(
        request._id,
        {
          status: "Rejected",
          responseDate: Date.now(),
        },
        { new: true },
        async (err, r) => {
          if (err) throw err;

          await Notification.findOneAndUpdate(
            { "message._id": r._id },
            { $set: { message: r } },
            { new: true },
            async (err, n) => {
              if (err) throw err;

              await Staff.findOneAndUpdate(
                { _id: request.senderID, "notifications._id": n._id },
                {
                  $set: { "notifications.$": n },
                }
              );

              await Staff.findOneAndUpdate(
                { _id: r.receiverID, "notifications._id": n._id },
                {
                  $set: { "notifications.$": n },
                }
              );
            }
          );
        }
      );

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

      //if one of the details was missing
      if (!weekday || !slotNum || !locationId)
        return res.status(400).json({
          msg:
            "Please enter weekday, slot number and location id to add a new slot.",
        });

      //weekday entered is of the wrong format
      if (!WEEKDAYS.includes(weekday))
        return res.status(400).json({
          msg:
            "Please enter weekday as one of the following formats: " + WEEKDAYS,
        });

      //if slot number is of the wrong format
      if (!SLOTNUMS.includes(slotNum))
        return res.status(400).json({
          msg:
            "Please enter slot number as one of the following formats: " +
            SLOTNUMS,
        });

      //if location id does not exist
      const location = await Location.findOne({ _id: locationId });
      if (!location)
        return res
          .status(404)
          .json({ msg: "There is no location with the id entered." });

      //if location is of type office
      if (location.type === "Office" || location.type === "office")
        return res
          .status(400)
          .json({ msg: "Cannot schedule a slot in an office" });

      //check if the location is already reserved during the chosen time (search for a slot already in the table with the same location and time)
      const intersectingSlot = await Slot.findOne({
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
      const courses = (
        await Staff.findOne({ staffID: user.staffID }).populate({
          path: "courseIDs",
        })
      ).courseIDs;

      //get the course coordinated by the coordinator
      let courseCoordinated;
      for (i = 0; i < courses.length; i++) {
        let ccID = courses[i].coordinatorID;
        if (ccID && ccID.equals(user.objectID)) courseCoordinated = courses[i];
      }
      console.log(courseCoordinated);
      //add the slot to the slot table
      let slot;
      await Slot.create(
        {
          weekday: weekday,
          number: slotNum,
          location: locationId,
          course: courseCoordinated._id,
        },
        async (err, sl) => {
          if (err) throw err;
          slot = sl;
          //add the slot to the course table
          await Course.findByIdAndUpdate(courseCoordinated._id, {
            $push: { slots: sl._id },
          });
        }
      );

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

      //if there was no slot id entered
      if (!slotId)
        return res
          .status(400)
          .json({ msg: "Please enter the slot id of the slot to be deleted." });

      //if there is no such slot
      const slot = await Slot.findOne({ _id: slotId });
      if (!slot)
        return res
          .status(404)
          .json({ msg: "There is no slot with the id given." });

      //if the slot is not for the course assigned to the cc

      //get the record of the course coordinator
      //populate the courses of the coordinator
      const courses = (
        await Staff.findOne({ staffID: user.staffID }).populate({
          path: "courseIDs",
        })
      ).courseIDs;

      //get the course coordinated by the coordinator
      let courseCoordinated;
      for (i = 0; i < courses.length; i++) {
        if (courses[i].coordinatorID.equals(user.objectID))
          courseCoordinated = courses[i];
      }
      //if the slot's course is not the course coordinated by the cc
      if (!courseCoordinated._id.equals(slot.course))
        return res.status(400).json({
          msg:
            "Slot is assigned to a course coordinated by another coordinator.",
        });

      //D)delete from course table

      await Course.findOneAndUpdate(
        { _id: slot.course },
        {
          $pull: { slots: { _id: slotId } },
        }
      );

      //A)remove from slot table
      await Slot.deleteOne({ _id: slotId });

      //B)if the slot is already taken by a staff => remove from schedule

      //get the staff that takes the course coordinated by cc and has the slot in the schedule
      //remove the slot from the schedule if it shares the same id as the slot to be removed
      const acStaff = await Staff.findOneAndUpdate(
        { courseIDs: courseCoordinated._id, schedule: { _id: slotId } },
        {
          $pull: { schedule: { _id: slotId } },
        }
      );

      //C)delete linking slot requests attributed to that slot

      //gets array of objectIds of linking slot requests related to that slot
      const LSid = await LinkingSlot.find({ "slot._id": slotId }, { _id: 1 });

      //if there are linking slot requests
      if (LSid > 0) {
        //delete these linking slot requests from the linking slot table
        await LinkingSlot.deleteMany({ _id: { $in: LSid } });

        //gets the array of objectIds of requests linked to the linking slot request of the deleted slot
        const requests = await Request.find(
          { "linkingSlot._id": { $in: LSid } },
          { senderID: 1, receiverID: 1 }
        );

        let RQid = [];
        let SenderID = [];
        let ReceiverID = [];
        requests.forEach((r) => {
          RQid.push(r._id);
          SenderID.push(r.senderID);
          ReceiverID.push(r.receiverID);
        });

        //delete these requests from the requests table
        await Request.deleteMany({ _id: { $in: RQid } });

        //gets the array of objectIds of notifications linked to the linking slot request of the slot to be deleted
        const NFid = await Notification.find(
          { "message._id": { $in: RQid } },
          { _id: 1 }
        );

        //delete those notifications from the notifications table
        await Notification.deleteMany({ _id: { $in: NFid } });

        //delete those notifications from those who sent them and received them
        await Staff.update(
          { $or: [{ _id: { $in: SenderID } }, { _id: { $in: ReceiverID } }] },
          {
            $pull: { notifications: { _id: { $in: NFid } } },
          },
          { multi: true }
        );
      }

      //E)delete replacement request associated with the deleted slot (as the slot was removed from the staff's schedule)

      //get the staff associated with the slot deleted
      if (acStaff) {
        const acNotifs = acStaff.notifications;

        //gets the objectIds of the replacement requests associated with the deleted slot
        let RepReqs = [];
        acNotifs.forEach((notif) => {
          //if the notification is replacement, has the deleted slot, sent by the slot holder, is pending and did not expire
          if (
            notif.message.replacement &&
            notif.message.replacement.replacmentSlot._id.equals(slotId) &&
            notif.message.senderID.equals(acStaff._id) &&
            notif.message.status === "Pending" &&
            Date.now() > notif.message.replacement.replacmentDay
          ) {
            RepReqs.push(notif.message.replacement._id);
          }
        });

        //if there are replacement requests
        if (RepReqs > 0) {
          //delete from the replacement, request, notification and sender and user table

          //delete from the replacement table
          await Replacement.deleteMany({ _id: { $in: RepReqs } });

          //delete from the request table

          //gets the array of objectIds of requests linked to the replacement of the deleted slot
          const requests = await Request.find(
            { "replacement._id": { $in: RepReqs } },
            { senderID: 1, receiverID: 1 }
          );

          let RQid = [];
          let SenderID = [];
          let ReceiverID = [];
          requests.forEach((r) => {
            RQid.push(r._id);
            SenderID.push(r.senderID);
            ReceiverID.push(r.receiverID);
          });

          //delete these requests from the requests table
          await Request.deleteMany({ _id: { $in: RQid } });

          //gets the array of objectIds of notifications linked to the replacement request of the slot to be deleted
          const NFid = await Notification.find(
            { "message._id": { $in: RQid } },
            { _id: 1 }
          );

          //delete those notifications from the notifications table
          await Notification.deleteMany({ _id: { $in: NFid } });

          //delete those notifications from those who sent them and received them
          await Staff.update(
            { $or: [{ _id: { $in: SenderID } }, { _id: { $in: ReceiverID } }] },
            {
              $pull: { notifications: { _id: { $in: NFid } } },
            },
            { multi: true }
          );
        }
      }

      return res.status(200).json({ msg: "Slot deleted" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//update a slot of the course coordinated by the cc
router.put(
  "/course-slot/update",
  authenticateAndAuthorise("Course Coordinator"),
  async (req, res) => {
    try {
      //gets the payload of the token
      //the payload is stored in req.user in the authentication method
      const user = req.user;

      //get the id of the slot to be updated and the features to be updated
      const { slotId, newWeekday, newSlotNum, newLocationId } = req.body;

      //if there is no slot id entered
      if (!slotId)
        return res
          .status(400)
          .json({ msg: "Please enter a slot id of the slot to be updated." });

      //if none of the features were entered
      if (!newWeekday && !newSlotNum && !newLocationId)
        return res.status(400).json({
          msg:
            "Please enter at least one of weekday, slot number or location id to update.",
        });

      //if there is no such slot
      const slot = await Slot.findOne({ _id: slotId });
      if (!slot)
        return res
          .status(404)
          .json({ msg: "There is no slot with the id given." });

      //weekday entered is of the wrong format
      if (newWeekday && !WEEKDAYS.includes(newWeekday))
        return res.status(400).json({
          msg:
            "Please enter weekday as one of the following formats: " + WEEKDAYS,
        });

      //if slot number is of the wrong format
      if (newSlotNum && !SLOTNUMS.includes(newSlotNum))
        return res.status(400).json({
          msg:
            "Please enter slot number as one of the following formats: " +
            SLOTNUMS,
        });

      //if location id does not exist or is of type office
      if (newLocationId) {
        const location = await Location.findOne({ _id: locationId });
        if (!location)
          return res
            .status(404)
            .json({ msg: "There is no location with the id entered." });

        if (location.type === "Office" || location.type === "office")
          return res
            .status(400)
            .json({ msg: "Cannot schedule a slot in an office" });
      }

      //if the slot is not for the course assigned to the cc

      //get the record of the course coordinator
      //populate the courses of the coordinator
      const courses = (
        await Staff.findOne({ staffID: user.staffID }).populate({
          path: "courseIDs",
        })
      ).courseIDs;

      //get the course coordinated by the coordinator
      let courseCoordinated;
      for (i = 0; i < courses.length; i++) {
        if (courses[i].coordinatorID.equals(user.objectID))
          courseCoordinated = courses[i];
      }
      //if the slot's course is not the course coordinated by the cc
      if (!courseCoordinated._id.equals(slot.course))
        return res.status(400).json({
          msg:
            "Slot is assigned to a course coordinated by another coordinator.",
        });

      //TODO: check if the update parameters are different and if not send  a message

      //if cc entered a new location id
      let locationId = null;
      if (newLocationId) locationId = newLocationId;
      else locationId = slot.location;

      //if cc enterd a new weekday
      let weekday = null;
      if (newWeekday) weekday = newWeekday;
      else weekday = slot.weekday;

      //if cc entered a new slot number
      let slotNum = null;
      if (newSlotNum) slotNum = newSlotNum;
      else slotNum = slot.number;

      //check for location contradictions

      //check if the location is already reserved during the chosen time (search for a slot already in the table with the same location and time)
      const intersectingSlot = await Slot.findOne({
        weekday: weekday,
        number: slotNum,
        location: locationId,
      });

      console.log(intersectingSlot);

      //if the location is already taken during the chosen time by a slot
      if (intersectingSlot)
        return res
          .status(400)
          .json({ msg: "Location chosen is already taken by a slot." });

      //A)update in slot table
      await Slot.findOneAndUpdate(
        { _id: slotId },
        { weekday: weekday, number: slotNum, location: locationId }
      );

      //B)if the slot is already taken by a staff => remove in schedule (as the slot has changed)

      //get the staff that takes the course coordinated by cc and has the slot in the schedule
      //remove the slot from the schedule if it shares the same id as the slot to be removed
      const acStaff = await Staff.findOneAndUpdate(
        { courseIDs: courseCoordinated._id, "schedule._id": slotId },
        {
          $pull: { schedule: { _id: slotId } },
        }
      );
      //remove staffID from slot
      slot.staffID = null;
      await slot.save();

      //C)delete linking slot requests attributed to that slot (as the slot has changed)

      //gets array of objectIds of linking slot requests related to that slot
      const LSid = await LinkingSlot.find({ "slot._id": slotId }, { _id: 1 });

      //if there are linking slots
      if (LSid.length > 0) {
        //delete these linking slot requests from the linking slot table
        await LinkingSlot.deleteMany({ _id: { $in: LSid } });

        //gets the array of objectIds of requests linked to the linking slot request of the deleted slot
        const requests = await Request.find(
          { "linkingSlot._id": { $in: LSid } },
          { senderID: 1, receiverID: 1 }
        );

        let RQid = [];
        let SenderID = [];
        let ReceiverID = [];
        requests.forEach((r) => {
          RQid.push(r._id);
          SenderID.push(r.senderID);
          ReceiverID.push(r.receiverID);
        });

        //delete these requests from the requests table
        await Request.deleteMany({ _id: { $in: RQid } });

        //gets the array of objectIds of notifications linked to the linking slot request of the slot to be deleted
        const NFid = await Notification.find(
          { "message._id": { $in: RQid } },
          { _id: 1 }
        );

        //delete those notifications from the notifications table
        await Notification.deleteMany({ _id: { $in: NFid } });

        //delete those notifications from those who sent them and received them
        await Staff.update(
          { $or: [{ _id: { $in: SenderID } }, { _id: { $in: ReceiverID } }] },
          {
            $pull: { notifications: { _id: { $in: NFid } } },
          },
          { multi: true }
        );
      }

      //E)delete replacement request associated with the deleted slot (as the slot was removed from the staff's schedule)

      //get the staff associated with the slot deleted
      if (acStaff) {
        const acNotifs = acStaff.notifications;

        //gets the objectIds of the replacement requests associated with the deleted slot
        let RepReqs = [];
        acNotifs.forEach((notif) => {
          //if the notification is replacement, has the deleted slot, sent by the slot holder, is pending and did not expire
          if (
            notif.message.replacement &&
            notif.message.replacement.replacmentSlot._id.equals(slotId) &&
            notif.message.senderID.equals(acStaff._id) &&
            notif.message.status === "Pending" &&
            Date.now() > notif.message.replacement.replacmentDay
          ) {
            RepReqs.push(notif.message.replacement._id);
          }
        });

        //if there are replacement requests
        if (RepReqs > 0) {
          //delete from the replacement table
          await Replacement.deleteMany({ _id: { $in: RepReqs } });

          //delete from the request table

          //gets the array of objectIds of requests linked to the replacement of the deleted slot
          const requests = await Request.find(
            { "replacement._id": { $in: RepReqs } },
            { senderID: 1, receiverID: 1 }
          );

          let RQid = [];
          let SenderID = [];
          let ReceiverID = [];
          requests.forEach((r) => {
            RQid.push(r._id);
            SenderID.push(r.senderID);
            ReceiverID.push(r.receiverID);
          });

          //delete these requests from the requests table
          await Request.deleteMany({ _id: { $in: RQid } });

          //gets the array of objectIds of notifications linked to the replacement request of the slot to be deleted
          const NFid = await Notification.find(
            { "message._id": { $in: RQid } },
            { _id: 1 }
          );

          //delete those notifications from the notifications table
          await Notification.deleteMany({ _id: { $in: NFid } });

          //delete those notifications from those who sent them and received them
          await Staff.update(
            { $or: [{ _id: { $in: SenderID } }, { _id: { $in: ReceiverID } }] },
            {
              $pull: { notifications: { _id: { $in: NFid } } },
            },
            { multi: true }
          );
        }
      }

      return res.status(200).json({ msg: "Slot updated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//-------------------------------------END OF COURSE COORDINATOR FUNCTIONALITIES---------------------------------------------

module.exports = router;
