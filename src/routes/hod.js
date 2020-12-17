const app = require("../../app");
const staff = require("../mongoose/dao/staff");
const department = require("../mongoose/dao/department");
const course = require("../mongoose/dao/course");
const { json } = require("express");
app.post("/hod/assignInstructor", async function (req, res) {
  let { staffID, courseCode } = req.body;
  try {
    // get uID
    let uID;
    // make sure staff id is valid
    if ((await staff.findOne({ id: staffID })) != {}) {
      // make sure HOD ID is valid and it has the right to add to this course
      let doc = await staff.find({ id: uID, role: "HOD" });
      if (doc && doc.length > 0) {
        let res = await department.findOne({ _id: doc.departmentID });
        // make sure coursecode is valid
        let output = await course.findOneAndUpdate(
          {
            courseCode,
            _id: { $in: res.coursesIDs, role: { $ne: "HOD" } },
          },
          {
            $push: { taList: staffID },
          }
        );
        json.send({
          result: output,
        });
      }
    } else {
      throw Error(
        "Department or course not found or its not assigned to this HOD !!"
      );
    }
  } catch (error) {
    json.send({
      error,
    });
  }
});

app.delete("/hod/deleteInstructor", async function (req, res) {
  let { staffID, courseCode } = req.body;
  try {
    // get uID
    let uID;
    // make sure staff id is valid
    if ((await staff.findOne({ id: staffID })) != {}) {
      // make sure HOD ID is valid and it has the right to add to this course
      let doc = await staff.find({ id: uID, role: "HOD" });
      if (doc && doc.length > 0) {
        let res = await department.findOne({ _id: doc.departmentID });
        // make sure coursecode is valid
        let output = await course.findOneAndUpdate(
          {
            courseCode,
            _id: { $in: res.coursesIDs, role: { $ne: "HOD" } },
          },
          {
            $pull: { taList: staffID },
          }
        );
        json.send({
          result: output,
        });
      }
    } else {
      throw Error(
        "Department or course not found or its not assigned to this HOD !!"
      );
    }
  } catch (error) {
    json.send({
      error,
    });
  }
});
app.delete("/hod/deleteInstructor", async function (req, res) {
  let { staffID, courseCode } = req.body;
  try {
    // get uID
    let uID;
    // make sure staff id is valid
    if ((await staff.findOne({ id: staffID })) != {}) {
      // make sure HOD ID is valid and it has the right to add to this course
      let doc = await staff.find({ id: uID, role: "HOD" });
      if (doc && doc.length > 0) {
        let res = await department.findOne({ _id: doc.departmentID });
        // make sure coursecode is valid
        let output = await course.findOneAndUpdate(
          {
            courseCode,
            _id: { $in: res.coursesIDs, role: { $ne: "HOD" } },
          },
          {
            $pull: { taList: staffID },
          }
        );
        json.send({
          result: output,
        });
      }
    } else {
      throw Error(
        "Department or course not found or its not assigned to this HOD !!"
      );
    }
  } catch (error) {
    json.send({
      error,
    });
  }
});

app.post("/hod/updateInstructor", async function (req, res) {
  let { staffIDBefore, staffIDAfter, courseCode } = req.body;
  try {
    // get uID
    let uID;
    // make sure staff id is valid
    if (
      (await staff.findOne({ id: staffIDBefore })) != {} &&
      (await staff.findOne({ id: staffIDAfter })) != {}
    ) {
      // make sure HOD ID is valid and it has the right to add to this course
      let doc = await staff.find({ id: uID, role: "HOD" });
      if (doc && doc.length > 0) {
        let res = await department.findOne({ _id: doc.departmentID });
        // make sure coursecode is valid
        let output = await course.findOneAndUpdate(
          {
            courseCode,
            _id: { $in: res.coursesIDs },
            role: { $ne: "HOD" },
            taList: staffIDBefore,
          },
          {
            $set: { "taList.$": staffIDAfter },
          }
        );
        json.send({
          result: output,
        });
      }
    } else {
      throw Error(
        "Department or course not found or its not assigned to this HOD !!"
      );
    }
  } catch (error) {
    json.send({
      error,
    });
  }
});
