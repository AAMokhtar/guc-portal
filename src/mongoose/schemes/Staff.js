const mongoose = require("mongoose");
//const { CustomGender } = require("../util/CustomGender");
const Notification = require("./Notification");
const Slot = require('./slot.js');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  dayOff: {
    type: String,
    enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
  },
  leaveBalance: {
    type: String,
  },
  attendance: [
    {
      date: {
        type: Date,
        //date is on this format "YYYY-MM-DD" --> var example = new Date("1999-12-30");
      },
      signIn: {
        type: [Date],
      },
      signOut: {
        type: [Date],
      },
    },
  ],
  accidentDays: {
    type: Number,
  },
  officeLocationID: { type: Schema.Types.ObjectId, ref: "Location" },
  salary: {
    type: Number,
  },
  facultyID: { type: Schema.Types.ObjectId, ref: "Faculty" },
  departmentID: { type: Schema.Types.ObjectId, ref: "Department" },
  courseIDs: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  notifications: {
    type: [Notification],
  },
  // string or object ?
  others: {
    type: Object,
  },
  role: {
    type: String,
    enum: ["HR", "Course Coordinator", "Course Instructor", "TA", "HOD"],
    required: true,
  },
  schedule: {
    type: [Slot],
  },
});
module.exports = schema;
