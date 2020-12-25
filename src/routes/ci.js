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

router.post(
  "/assignTaToCourse",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    let { staffID, courseCode } = req.body.data;
    try {
      // NOT  COMPLETED !
      // get uID
      let uID = req.user.staffID;
      // make sure staff id is valid
      let tempStaff = await staff.findOne({ staffID });
      if (tempStaff) {
        let objectID = tempStaff.id;
        // make sure HOD ID is valid and it has the right to add to this course
        let doc = await staff.findOne({ staffID: uID });
        if (doc) {
          // make sure coursecode is valid
          let output;
          let result = doc.courseIDs;
          if (tempStaff.role == "HR") {
            throw Error("Cannot assign hr to a course !");
          } else if (tempStaff.role == "TA") {
            output = await course.findOneAndUpdate(
              {
                courseCode,
                _id: {
                  $in: result,
                  // , role:  { $ne: "HOD" }
                },
              },
              {
                $addToSet: { taList: objectID },
              },
              { new: true }
            );
          }
          let updateStaff = await staff.findByIdAndUpdate(
            { _id: objectID },
            { $addToSet: { courseIDs: output.id } },
            { new: true }
          );
          res.status(200).json({
            result: output,
          });
        }
      } else {
        throw Error(
          "Department or course not found or its not assigned to this HOD !!"
        );
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);
router.post(
  "/deleteTafromCourse",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    let { staffID, courseCode } = req.body.data;
    try {
      // NOT  COMPLETED !
      // get uID
      let uID = req.user.staffID;
      // make sure staff id is valid
      let tempStaff = await staff.findOne({ staffID });
      if (tempStaff) {
        let objectID = tempStaff.id;
        // make sure HOD ID is valid and it has the right to add to this course
        let doc = await staff.findOne({ staffID: uID });
        if (doc) {
          // make sure coursecode is valid
          let output;
          let result = doc.courseIDs;
          if (tempStaff.role == "HR") {
            throw Error("Cannot assign hr to a course !");
          } else if (tempStaff.role == "TA") {
            output = await course.findOneAndUpdate(
              {
                courseCode,
                _id: {
                  $in: result,
                  // , role:  { $ne: "HOD" }
                },
              },
              {
                $pull: { taList: objectID },
              },
              { new: true }
            );
          }
          let updateStaff = await staff.findByIdAndUpdate(
            { _id: objectID },
            { $pull: { courseIDs: output.id } },
            { new: true }
          );
          res.status(200).json({
            result: output,
          });
        }
      } else {
        throw Error(
          "Department or course not found or its not assigned to this HOD !!"
        );
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);

router.post(
  "/updateTACourse",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    let { staffID, courseCodeBefore, courseCodeAfter } = req.body.data;
    try {
      // get uID
      let uID = req.user.staffID;
      // make sure staff id is valid
      let tempStaff = await staff.findOne({ staffID });
      if (tempStaff) {
        let objectID = tempStaff.id;
        // make sure HOD ID is valid and it has the right to add to this course
        let doc = await staff.findOne({ staffID: uID });
        //     console.log(doc);
        if (doc) {
          // make sure coursecode is valid
          let output2;
          let output1;
          if (tempStaff.role == "HR") {
            throw Error("Cannot assign hr to a course !");
          } else if (tempStaff.role == "TA") {
            output1 = await course.findOneAndUpdate(
              {
                courseCode: courseCodeBefore,
                _id: {
                  $in: doc.courseIDs,
                  // , role: { $ne: "HOD" }
                },
              },
              {
                $pull: { taList: objectID },
              },
              { new: true }
            );
            if (!output1) {
              throw Error("wrong `coursecodeBefore`");
            }
            if (
              !(await course.findOne({
                courseCode: courseCodeAfter,
                _id: {
                  $in: doc.courseIDs,
                  // , role: { $ne: "HOD" }
                },
              }))
            )
              throw Error(
                "course instructor doesnt teach `courseCodeAfter` please choose a course in the courses he teaches"
              );
            output2 = await course.findOneAndUpdate(
              {
                courseCode: courseCodeAfter,
                _id: {
                  $in: doc.courseIDs,
                  // , role: { $ne: "HOD" }
                },
              },
              {
                $addToSet: { taList: objectID },
              },
              { new: true }
            );
          }
          let updateStaff = await staff.findByIdAndUpdate(
            { _id: objectID },
            { $pull: { courseIDs: output1.id } },
            { new: true }
          );
          updateStaff = await staff.findByIdAndUpdate(
            { _id: objectID },
            { $addToSet: { courseIDs: output2.id } },
            { new: true }
          );
          res.status(200).json({
            result: output2,
          });
        }
      } else {
        throw Error(
          "Department or course not found or its not assigned to this HOD !!"
        );
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);

router.post(
  "/updateTACourse",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    let { staffIDB, courseCode } = req.body.data;
    try {
      // NOT  COMPLETED !
      // get uID
      let uID = req.user.staffID;
      // make sure staff id is valid
      let tempStaff = await staff.findOne({ staffID });
      if (tempStaff) {
        let objectID = tempStaff.id;
        // make sure HOD ID is valid and it has the right to add to this course
        let doc = await staff.findOne({ staffID: uID });
        if (doc) {
          // make sure coursecode is valid
          let output;
          let result = doc.courseIDs;
          if (tempStaff.role == "HR") {
            throw Error("Cannot assign hr to a course !");
          } else if (tempStaff.role == "TA") {
            output = await course.findOneAndUpdate(
              {
                courseCode,
                _id: {
                  $in: result,
                  // , role:  { $ne: "HOD" }
                },
              },
              {
                $pull: { taList: objectID },
              },
              { new: true }
            );
          }
          let updateStaff = await staff.findByIdAndUpdate(
            { _id: objectID },
            { $pull: { courseIDs: output.id } },
            { new: true }
          );
          res.status(200).json({
            result: output,
          });
        }
      } else {
        throw Error(
          "Department or course not found or its not assigned to this HOD !!"
        );
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);
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

router.post(
  "/deleteAcademicFromSlot",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });

      let { staffID, weekday, number, courseCode, location } = req.body.data;
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

      let locationDoc = await Location.findOne({ name: location });
      if (!locationDoc) throw Error("Location not found!");
      let locationID = locationDoc.id;

      let slotDoc = await slot.findOne({
        weekday: weekday,
        number,
        location: locationID,
        course: courseID,
      });
      if (!slotDoc) throw Error("Slot not found!");

      slotDoc.staffID = null;
      await slotDoc.save();
      let result = slotDoc;

      let temp = result.toObject();
      delete temp._id;
      let tempDoc = await staff.findOne({
        staffID,
      });
      tempDoc.markModified("schedule");
      tempDoc.schedule.map((slot, i) => {
        if (
          slot.weekday == weekday &&
          slot.number == number &&
          slot.location == locationID &&
          slot.course == courseID
        )
          tempDoc.schedule.splice(i, 1);
      });

      //tempDoc.schedule = tmpRST;
      console.log(tempDoc);
      tempDoc.markModified("schedule");
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

router.post(
  "/AssignUnassignedSlot",
  authenticateAndAuthorise("Course Instructor"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });

      let { staffID, weekday, number, courseCode, location } = req.body.data;
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

      let locationDoc = await Location.findOne({ name: location });
      if (!locationDoc) throw Error("Location not found!");
      console.log(locationDoc);
      let locationID = locationDoc.id;
      console.log({
        weekday: weekday,
        number,
        location: locationID,
        course: courseID,
      });
      let slotDoc = await slot.findOne({
        weekday: weekday,
        number,
        location: locationID,
        course: courseID,
      });
      if (!slotDoc) throw Error("Slot not found!");

      if (slotDoc.staffID != null)
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
      tempDoc.markModified("schedule");
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
router.post(
  "/updateSlot",
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
        numberAfter,
        locationAfter,
        weekdayAfter,
      } = req.body.data;

      if (
        !staffID ||
        !weekdayBefore ||
        !numberBefore ||
        !courseCode ||
        !locationBefore ||
        !numberAfter ||
        !locationAfter ||
        !weekdayAfter
      )
        throw Error(
          "Please enter `{  staffID, courseCode, weekdayBefore,  numberBefore,  locationBefore, numberAfter, locationAfter,  weekdayAfter, }` inside the body.data"
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

      let locationDocAfter = await Location.findOne({ name: locationAfter });
      if (!locationDocAfter) throw Error("`After Location` not found!");
      let locationDocBefore = await Location.findOne({ name: locationBefore });
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
      let courseDoc = await course.findOne({ courseCode });
      tempDoc.schedule.map((slot, i) => {
        if (
          slot.course == courseDoc.id &&
          slot.number == numberBefore &&
          slot.weekday == weekdayBefore &&
          slot.location == locationIdBefore
        ) {
          tempDoc.schedule.splice(i, 1);
        }
      });

      tempDoc.schedule.push(temp);
      // console.log("sds", tempDoc);

      tempDoc.markModified("schedule");
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
      console.log(staffDoc);
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
      //// NEEDS MODIFICATIONS !!!!!

      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let requests;

      let staffDoc = await staff.findOne({ _id: objectID }).populate({
        path: "courseIDs",
      });
      let result = [];
      //console.log(JSON.stringify(departmentDoc));

      await Promise.all(
        staffDoc.courseIDs.map(async (course) => {
          let slots = await slot.find({ course: course._id });
          let unAssignedSlots = 0;
          slots.forEach((s) => {
            if (s.staffID == null) {
              unAssignedSlots++;
            }
          });
          let { courseCode, _id } = course;
          result.push({
            courseCode,
            _id,
            coverage: ((slots.length - unAssignedSlots) / slots.length) * 100,
          });
          // console.log(tempRes);
        })
      );

      //  departmentDoc = departmentDoc.populate("coursesIDs");
      //   .("coursesIDs.taList");
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
router.get(
  "/viewAssignments",
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

module.exports = router;
