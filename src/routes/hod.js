const app = require("../../app");
const staff = require("../mongoose/dao/staff");
const department = require("../mongoose/dao/department");
const course = require("../mongoose/dao/course");
const express = require("express");
const { json } = require("express");
var router = express.Router();
const { authenticateAndAuthorise } = require("./auth.js");
var _ = require("lodash");

/// make sure that the staff has the correct role
router.post(
  "/assignInstructor",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    let { staffID, courseCode } = req.body.data;
    try {
      // NOT  COMPLETED !
      // get uID
      let uID = req.user.staffID;
      // make sure staff id is valid
      let temp = await staff.findOne({ staffID });
      if (temp) {
        let objectID = temp.id;
        // make sure HOD ID is valid and it has the right to add to this course
        let doc = await staff.find({ staffID: uID, role: "HOD" });
        console.log(doc);
        if (doc && doc.length > 0) {
          let result = await department.findOne({ id: doc.departmentID });
          console.log(result);
          // make sure coursecode is valid
          let output = await course.findOneAndUpdate(
            {
              courseCode,
              _id: {
                $in: result.coursesIDs,
                // , role: { $ne: "HOD" }
              },
            },
            {
              $addToSet: { taList: objectID },
            },
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
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);

router.delete(
  "/deleteInstructor",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    let { staffID, courseCode } = req.body.data;
    try {
      // NOT  COMPLETED !
      // get uID
      let uID = req.user.staffID;
      // make sure staff id is valid
      let temp = await staff.findOne({ staffID });
      if (temp) {
        let objectID = temp.id;
        // make sure HOD ID is valid and it has the right to add to this course
        let doc = await staff.find({ staffID: uID, role: "HOD" });
        console.log(doc);
        if (doc && doc.length > 0) {
          let result = await department.findOne({ id: doc.departmentID });
          console.log(result);
          // make sure coursecode is valid
          let output = await course.findOneAndUpdate(
            {
              courseCode,
              _id: {
                $in: result.coursesIDs,
                // , role: { $ne: "HOD" }
              },
            },
            {
              $pull: { taList: objectID },
            },
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
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);

router.post(
  "/updateInstructor",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    let { staffIDBefore, staffIDAfter, courseCode } = req.body.data;
    try {
      // get uID
      let uID = req.user.staffID;
      // make sure staff id is valid
      let firstStaff = await staff.findOne({ staffID: staffIDBefore });
      let secondStaff = await staff.findOne({ staffID: staffIDAfter });
      if (firstStaff && secondStaff) {
        firstStaff = firstStaff.id;
        secondStaff = secondStaff.id;
        // make sure HOD ID is valid and it has the right to add to this course
        let doc = await staff.find({ staffID: uID, role: "HOD" });
        if (doc && doc.length > 0) {
          let result = await department.findOne({ id: doc.departmentID });
          // make sure coursecode is valid
          let output = await course.findOneAndUpdate(
            {
              courseCode,
              _id: { $in: result.coursesIDs },
              //     role: { $ne: "HOD" },
              taList: firstStaff,
            },
            {
              $set: { "taList.$": secondStaff },
            },
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
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);
router.get(
  "/viewStaff",
  authenticateAndAuthorise("HOD"),
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
router.get(
  "/viewDayOff",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    try {
      // get uID
      let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let { coursesIDs } = await department.findOne({ hodID: objectID });
      let result = await course.find({ _id: { $in: coursesIDs } });
      let temp = [];
      result.forEach((element) => {
        // staff ?
        temp = _.union(temp, element.instructorIDs, element.taList);
      });

      result = await staff.find({ _id: { $in: temp } }, "dayOff staffID");
      if (staffID) {
        let actualStaff;
        result.forEach((element) => {
          if (element.staffID == staffID) actualStaff = element;
        });
        if (!actualStaff)
          throw Error(
            "Staff memeber doesnt exist in the same department of this HOD"
          );
        result = actualStaff;
      }
      res.status(200).json({
        result: result,
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
