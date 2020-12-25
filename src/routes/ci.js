const app = require("../../app");
const staff = require("../mongoose/dao/staff");
const mongoose = require("mongoose");
const department = require("../mongoose/dao/department");
const request = require("../mongoose/dao/request");
const course = require("../mongoose/dao/course");
const express = require("express");
let slot = require("../mongoose/dao/slot");
const { json } = require("express");
var router = express.Router();
const { authenticateAndAuthorise } = require("./auth.js");
var _ = require("lodash");
const Location = require("../mongoose/dao/location");

router.get(
  "/AssignCordinator",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });

      let { staffID, courseCode } = req.query;
      if (!staffID) throw Error("Please enter `staffID,courseCode` param");

      let instructorDoc = await staff
        .findOne({ _id: objectID })
        .populate("courseIDs");
      let staffDoc = await staff.findOne({ staffID }).populate("courseIDs");

      let f1 = false;
      let f2 = false;
      let courseID;
      instructorDoc.courseIDs.forEach((course) => {
        if (course.courseCode == courseCode) {
          f1 = true;
          courseID = course.id;
        }
      });

      if (f1 === false)
        throw Error(
          "the authenticated instructor doesnt teach the courseCode you entered in the req"
        );

      staffDoc.courseIDs.forEach((course) => {
        if (course.courseCode == courseCode) {
          f2 = true;
          courseID = course.id;
        }
      });

      if (f2 === false)
        throw Error(
          "the academic member doesnt teach the courseCode you entered in the req"
        );

      let courseDOC = await course.find({ _id: courseID });
      if (courseDOC.coordinatorID != null) {
        throw Error("Course already has a course cordinator!");
      }
      courseDOC.coordinatorID = staffDoc.id;
      let result = await staffDoc.save();

      res.status(200).json({
        result,
      });

      // make sure staff id is valid
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);

router.get(
  "/AssignUnassignedSlot",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });

      let { staffID, weekday, number, courseCode, location } = req.query;
      if (!staffID)
        throw Error(
          "Please enter `{ staffID, weekday, number, courseCode, location }` param"
        );

      let instructorDoc = await staff
        .findOne({ _id: objectID })
        .populate("courseIDs");
      let staffDoc = await staff.findOne({ staffID }).populate("courseIDs");

      let f1 = false;
      let f2 = false;
      let courseID;
      instructorDoc.courseIDs.forEach((course) => {
        if (course.courseCode == courseCode) {
          f1 = true;
          courseID = course.id;
        }
      });

      if (f1 === false)
        throw Error(
          "the authenticated instructor doesnt teach the courseCode you entered in the req"
        );

      staffDoc.courseIDs.forEach((course) => {
        if (course.courseCode == courseCode) {
          f2 = true;
          courseID = course.id;
        }
      });

      if (f2 === false)
        throw Error(
          "the academic member doesnt teach the courseCode you entered in the req"
        );

      let locationDoc = location.findOne({ name: location });
      if (!locationDoc) throw Error("Location not found!");

      let locationID = locationDoc.id;

      let slotDoc = await slot.findOne({
        weekday: weekday,
        number,
        location: locationID,
        course: courseID,
      });
      if (!slotDoc) throw Error("Slot not found!");

      if (slot.staffID != null)
        throw Error("Slot is already assigned to an academic member!");

      slotDoc.staffID = staffID;
      await slotDoc.save();
      let result = slotDoc;

      let temp = result.toObject();
      delete temp._id;
      let tempDoc = await staff.findOne({
        staffID,
      });
      tempDoc.schedule.push(temp);
      temp.markModified("schedule");
      await tempDoc.save();

      res.status(200).json({
        result,
      });

      // make sure staff id is valid
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);
router.get(
  "/AssignUnassignedSlot",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let {
        staffID,
        courseCode,
        weekdayBefore,
        numberBefore,
        locationBefore,
        weekdayAfter,
        numberAfter,
        locationAfter,
      } = req.query;

      if (!staffID || !weekday || !number || !courseCode || !location)
        throw Error(
          "Please enter `{ staffID, weekday, number, courseCode, location }` param"
        );

      let instructorDoc = await staff
        .findOne({ _id: objectID })
        .populate("courseIDs");
      let staffDoc = await staff.findOne({ staffID }).populate("courseIDs");

      let f1 = false;
      let f2 = false;
      let courseID;
      instructorDoc.courseIDs.forEach((course) => {
        if (course.courseCode == courseCode) {
          f1 = true;
          courseID = course.id;
        }
      });

      if (f1 === false)
        throw Error(
          "the authenticated instructor doesnt teach the courseCode you entered in the req"
        );

      staffDoc.courseIDs.forEach((course) => {
        if (course.courseCode == courseCode) {
          f2 = true;
          courseID = course.id;
        }
      });

      if (f2 === false)
        throw Error(
          "the academic member doesnt teach the courseCode you entered in the req"
        );

      let locationDocAfter = Location.findOne({ name: locationAfter });
      if (!locationDocAfter) throw Error("`After Location` not found!");
      let locationDocBefore = Location.findOne({ name: locationBefore });
      if (!locationDocBefore) throw Error("`Before Location` not found!");

      let locationIdBefore = locationDocBefore.id;
      let locationIdAfter = locationDocAfter.id;
      let slotDocBefore = await slot.findOne({
        weekday: weekdayBefore,
        number: numberBefore,
        location: locationIdBefore,
        course: courseID,
      });
      if (!slotDocBefore) throw Error("before Slot not found!");

      let slotDocAfter = await slot.findOne({
        weekday: weekdayAfter,
        number: numberAfter,
        location: locationIdAfter,
        course: courseID,
      });
      if (!slotDocAfter) throw Error("after Slot not found!");

      if (slotDocAfter.staffID != null)
        throw Error("Slot `after` is already assigned to an academic member!");

      slotDocBefore.staffID = null;
      await slotDocBefore.save();

      slotDocAfter.staffID = staffID;
      let result = await slotDocAfter.save();

      let temp = result.toObject();
      delete temp._id;
      let tempDoc = await staff.findOne({
        staffID,
      });
      tempDoc.schedule = temp.schedule
        .map((slot) => {
          if (
            slot.courseCode == courseCode &&
            slot.number == numberBefore &&
            slot.weekday == weekdayBefore &&
            slot.location == locationIdBefore
          )
            return null;
          return slot;
        })
        .filter((n) => n);
      tempDoc.schedule.push(temp);
      temp.markModified("schedule");
      await tempDoc.save();

      res.status(200).json({
        result,
      });

      // make sure staff id is valid
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);

router.get(
  "/viewSlots",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let requests;

      let staffDoc = await staff
        .findOne({ _id: objectID })
        .populate("schedule.course");
      staffDoc = staffDoc.toObject();
      staffDoc.schedule = staffDoc.schedule.map((el) => {
        return {
          weekday: el.weekday,
          number: el.number,
          location: el.location,
          courseID: el.course._id,
          courseCode: el.course.courseCode,
        };
      });

      const { schedule, staffID, email, _id } = staffDoc;
      res.status(200).json({
        result: { schedule, staffID, _id, email },
      });

      // make sure staff id is valid
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);
router.get(
  "/viewCoverage",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let requests;

      let staffDoc = await staff.findOne({ _id: objectID }).populate({
        path: "courseIDs",
        populate: {
          path: "instructorIDs taList coordinatorID",
        },
      });
      //console.log(JSON.stringify(departmentDoc));
      let result = [];
      console.log(staffDoc);
      await Promise.all(
        staffDoc.courseIDs.map(async (course) => {
          let courseID = course._id;
          //     console.log(courseID);
          let courseResult = [];

          course.instructorIDs.forEach((ta) => {
            let slotsResults = [];

            ta.schedule.forEach((schedule) => {
              if (courseID.equals(schedule.course)) slotsResults.push(schedule);
            });

            courseResult.push({
              staffID: ta.staffID,
              staffObjectID: ta.id,
              role: ta.role,
              schedule: slotsResults,
            });
          });
          course.taList.forEach((ta) => {
            let slotsResults = [];

            ta.schedule.forEach((schedule) => {
              if (courseID.equals(schedule.course)) slotsResults.push(schedule);
            });
            courseResult.push({
              staffID: ta.staffID,
              staffObjectID: ta.id,
              role: ta.role,
              schedule: slotsResults,
            });
          });

          result.push({
            courseCode: course.courseCode,
            courseID: course.id,
            result: courseResult,
          });
        })
      );

      //  departmentDoc = departmentDoc.populate("coursesIDs");
      //   .("coursesIDs.taList");
      res.status(200).json({
        result: result,
      });

      // make sure staff id is valid
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);

router.get(
  "/viewStaff",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    try {
      // get uID
      let { courseCode } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let { coursesIDs } = await department.findOne({ hodID: objectID });
      let result;
      if (courseCode) {
        result = await course.find({ courseCode });
        if (result.length == 0) throw Error("Wrong course code !");

        if (!coursesIDs.includes(result[0].id))
          throw Error("This course isnt in same department of HOD");
      } else {
        result = await course.find({ _id: { $in: coursesIDs } });
      }
      let temp = [];
      result.forEach((element) => {
        // staff ?
        temp = _.union(temp, element.instructorIDs, element.taList);
      });
      // console.log(temp);

      result = await staff.find({ _id: { $in: temp } });
      res.status(200).json({
        result,
      });
      // make sure staff id is valid
    } catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);
module.exports = router;
