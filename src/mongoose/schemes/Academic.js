const mongoose = require("mongoose");
const staff = require("../dao/staff.js");
const Schema = mongoose.Schema;
const schema = staff.discriminator(
  "Academic",
  new mongoose.Schema({
    academicID: {
      type: [Schema.Types.ObjectId],
      ref: "Staff",
      required: true,
    },
    role: {
      type: String,
      enum: [
        "Couse Coordinator",
        "Course Instructor",
        "TA",
        "HOD",
      ],
      required: true,
    },
    schedule: {
      type: [Schema.Types.ObjectId],
      ref: "Slot",
      required: true,
    },
  })
);
module.exports = schema;
