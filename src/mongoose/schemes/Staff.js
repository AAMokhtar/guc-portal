const mongoose = require("mongoose");
//const { CustomGender } = require("../util/CustomGender");
const Notification = require("./Notification");
const Slot = require("./slot.js");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  staffID: {
    type: String,
    unique: [true, 'the provided staff id is not unique'],
    required: [true, 'please enter your staff id']
  },
  email: {
    type: String,
    unique: [true, 'the email entered is not unique'],
    required: [true, 'please provide your email']
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum:{
      values: ["Male", "Female"],
      message: 'please enter a valid gender (Male,Female)'
    } 
  },
  dayOff: {
    type: String,
    enum: {
      values: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      message: '{VALUE} is not an valid day'
    } 
  },
  leaveBalance: {
    type: Number,
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
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
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
    enum: {
      values: ["HR", "Course Coordinator", "Course Instructor", "TA", "HOD"],
      message: 'please endter a valid role from these values: ["HR", "Course Coordinator", "Course Instructor", "TA", "HOD"]'
    },
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
