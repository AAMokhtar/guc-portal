const staff = require("../models/staff");
const mongoose = require("mongoose");
const department = require("../models/department");
const request = require("../models/request");
const Request = require("../models/request");

const course = require("../models/course");
const express = require("express");
let slot = require("../models/slot");
const { json } = require("express");
var router = express.Router();
const { authenticateAndAuthorise } = require("./auth.js");
var _ = require("lodash");
const { schedule } = require("node-cron");

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
      let tempStaff = await staff.findOne({ staffID });
      if (tempStaff) {
        let objectID = tempStaff.id;
        // make sure HOD ID is valid and it has the right to add to this course

        let doc = await staff.find({ staffID: uID });

        //     console.log(doc);
        if (doc && doc.length > 0) {
          let result = await department.findOne({ _id: doc[0].departmentID });
          // make sure coursecode is valid
          let output;
          if (tempStaff.role != "Course Instructor") {
            throw Error(
              "HOD can assign courses only to course instructors .. to assign TAs please use an instructor account"
            );
          } else if (tempStaff.role == "Course Instructor") {
            output = await course.findOneAndUpdate(
              {
                courseCode,
                _id: {
                  $in: result.coursesIDs,
                  // , role: { $ne: "HOD" }
                },
              },
              {
                $addToSet: { instructorIDs: objectID },
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
  "/updateInstructor",
  authenticateAndAuthorise("HOD"),
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
        let doc = await staff.find({ staffID: uID });
        //     console.log(doc);
        if (doc && doc.length > 0) {
          let result = await department.findOne({ id: doc.departmentID });
          // make sure coursecode is valid
          let output2;
          let output1;
          if (tempStaff.role == "HR") {
            throw Error("Cannot assign hr to a course !");
          } else if (tempStaff.role == "Course Instructor") {
            output1 = await course.findOneAndUpdate(
              {
                courseCode: courseCodeBefore,
                _id: {
                  $in: result.coursesIDs,
                  // , role: { $ne: "HOD" }
                },
              },
              {
                $pull: { instructorIDs: objectID },
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
                  $in: result.coursesIDs,
                  // , role: { $ne: "HOD" }
                },
              }))
            )
              throw Error(
                "course HOD doesnt teach `courseCodeAfter` please choose a course in the same department"
              );
            output2 = await course.findOneAndUpdate(
              {
                courseCode: courseCodeAfter,
                _id: {
                  $in: result.coursesIDs,
                  // , role: { $ne: "HOD" }
                },
              },
              {
                $addToSet: { instructorIDs: objectID },
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
        //  console.log(doc);
        if (doc && doc.length > 0) {
          let result = await department.findOne({ id: doc.departmentID });
          //  console.log(result);
          // make sure coursecode is valid
          let output;
          let tempStaff = temp;
          if (tempStaff.role == "HR") {
            throw Error("Cannot assign hr to a course !");
          } else if (tempStaff.role == "Course Instructor") {
            output = await course.findOneAndUpdate(
              {
                courseCode,
                _id: {
                  $in: result.coursesIDs,
                  // , role: { $ne: "HOD" }
                },
              },
              {
                $pull: { instructorIDs: objectID },
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
      // console.log(temp);

      result = await staff
        .find({ _id: { $in: temp } }, { password: 0, tokens: 0 })
        .populate({
          path: "schedule.location schedule.course courseIDs departmentID",
          //    populate: {
          //     path: "instructorIDs taList coordinatorID",}
        });
      let rst = [];
      result.map((el) => {
        let localRst = [];
        let d = el.departmentID ? el.departmentID.name : el.departmentID;
        el.courseIDs.map((course) => {
          localRst.push(course.courseCode);
        });
        el = el._doc;
        rst.push({
          ...el,
          courseIDs: localRst,
          departmentID: d,
        });
      });

      res.status(200).json({
        result: rst,
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
router.get(
  "/viewRequests",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    try {
      // get uID
      let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let requests;

      if (staffID) {
        let staffDoc = await staff.findOne({ staffID });
        requests = await request
          .find({
            receiverID: objectID,
            senderID: staffDoc.id,
          })
          .populate({
            path: "receiverID senderID",
          });
      } else {
        requests = await request
          .find({
            receiverID: objectID,
          })
          .populate({
            path: "receiverID senderID",
          });
      }
      let ret = [];
      requests.map((req) => {
        req = req._doc;
        ret.push({
          ...req,
          receiverID: req.receiverID ? req.receiverID.staffID : null,
          senderID: req.senderID ? req.senderID.staffID : null,
        });
      });

      res.status(200).json({
        result: ret,
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
  "/viewCoverage",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    try {
      //// NEEDS MODIFICATIONS !!!!!

      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let requests;

      let departmentDoc = await department
        .findOne({ hodID: objectID })
        .populate({
          path: "coursesIDs",
          //    populate: {
          //     path: "instructorIDs taList coordinatorID",}
        });
      let result = [];
      //console.log(JSON.stringify(departmentDoc));
      console.log(req.user);
      await Promise.all(
        departmentDoc.coursesIDs.map(async (course) => {
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
      console.log(error);
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);
router.get(
  "/viewAssignements",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      // let user = await staff.findOne({ staffID: uID });
      let requests;

      let departmentDoc = await department
        .findOne({ hodID: objectID })
        .populate({
          path: "coursesIDs",
          populate: {
            path: "instructorIDs taList coordinatorID",
          },
        });

      //console.log(JSON.stringify(departmentDoc));
      let result = [];

      await Promise.all(
        departmentDoc.coursesIDs.map(async (course) => {
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

router.post(
  "/AcceptRequest",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      let user = await staff.findOne({ staffID: uID });
      const { requestID } = req.body.data;

      //if no request id entered
      if (!requestID)
        return res.status(400).json({
          msg: "Please enter the request id of the request you want to accept.",
        });

      //get the request to be accepted from the database
      let request = await Request.findOne({ _id: requestID });
      if (!request.receiverID.equals(user.id)) {
        return res
          .status(404)
          .json({ msg: "There request wasnt sent to this authenticated HOD." });
      }

      //if there is no such request
      if (!request)
        return res
          .status(404)
          .json({ msg: "There is no request with the id given." });

      if (!request.dayOff && !request.leave)
        return res
          .status(400)
          .json({ msg: "Request entered is not a dayOff or leave request." });
      let receiverDoc = await staff.findOne({ _id: request.senderID });

      if (request.dayOff) {
        receiverDoc.dayOff = request.dayOff.requestedDayOff;
        const date1 = new Date(request.startDate);
        const date2 = new Date(request.endDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        currentBalance = receiverDoc.leaveBalance - diffDays;
        if (currentBalance < 0) {
          request.status = "Rejected";
          let result = await request.save();
          throw Error(
            "staff leave balance is smaller than the requested number of days, therefore your request was rejected!"
          );
        }
        receiverDoc.leaveBalance = currentBalance;
      }
      request["responseDate"] = Date.now();
      request.status = "Accepted";
      request["comment"] = "";
      let result = await request.save();
      request = request.toObject();
      delete request._id;
      if (receiverDoc["notifications"])
        receiverDoc["notifications"].push({ message: request });
      await receiverDoc.save();
      //console.log(JSON.stringify(departmentDoc));

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

router.post(
  "/RejectRequest",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      let user = await staff.findOne({ staffID: uID });
      let { requestID } = req.body.data;

      //if no request id entered
      if (!requestID)
        return res.status(400).json({
          msg: "Please enter the request id of the request you want to accept.",
        });

      //get the request to be accepted from the database
      let request = await Request.findOne({ _id: requestID });
      if (!request.receiverID.equals(user.id)) {
        return res
          .status(404)
          .json({ msg: "There request wasnt sent to this authenticated HOD." });
      }

      //if there is no such request
      if (!request)
        return res
          .status(404)
          .json({ msg: "There is no request with the id given." });

      if (!request.dayOff && !request.leave)
        return res
          .status(400)
          .json({ msg: "Request entered is not a dayOff or leave request." });

      let receiverDoc = await staff.findOne({ _id: request.senderID });

      request["responseDate"] = Date.now();
      request.status = "Rejected";
      if (req.query.comment) request.comment = req.query.comment;
      let result = await request.save();
      request = request.toObject();
      delete request._id;
      receiverDoc["notifications"].push({ message: request });
      await receiverDoc.save();
      //console.log(JSON.stringify(departmentDoc));

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
  "/getCourses",
  authenticateAndAuthorise("HOD"),
  async function (req, res) {
    try {
      // get uID
      // let { staffID } = req.query;
      let { staffID: uID, objectID } = req.user;
      let doc = await department.findOne({ hodID: objectID }).populate({
        path: "coursesIDs",
        //    populate: {
        //     path: "instructorIDs taList coordinatorID",}
      });
      let result = [];
      if (!doc) throw Error("not found ");
      doc.coursesIDs.forEach((element) => {
        result.push(element.courseCode);
      });
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
module.exports = router;
