const e = require("express");
const mongoose = require("mongoose");
//const { CustomGender } = require("../util/CustomGender");

const schema = new mongoose.Schema({
  id: {
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
  officeLocation: {
    type: Location,
  },
  salary: {
    type: Number,
  },
  facultyID: {
    type: { type: Schema.Types.ObjectId, ref: "Faculty" },
  },
  departmentID: {
    type: { type: Schema.Types.ObjectId, ref: "Department" },
  },
  notifications: {
    type: [Notification],
  },
});
module.exports = schema;
