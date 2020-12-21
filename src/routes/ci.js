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
const { schedule } = require("node-cron");

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
module.exports = router;
