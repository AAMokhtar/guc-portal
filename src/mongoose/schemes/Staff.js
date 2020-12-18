const mongoose = require("mongoose");
//const { CustomGender } = require("../util/CustomGender");
const Notification = require("./Notification");
const Slot = require("./slot.js");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  staffID: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
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

/* schema.methods.generateAuthToken = async function () {
  const self = this;
  const token = jwt.sign({ _id: self._id.toString() }, process.env.JWT_SECRET);

  //user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}; */

// Hash the plain text password before saving
schema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
/* schema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
}); */
module.exports = schema;
