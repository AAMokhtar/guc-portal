const mongoose = require("mongoose");
//const { CustomGender } = require("../util/CustomGender");
const Notification = require("./Notification");
const Slot = require("./slot.js");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  staffID: {
    type: String,
    unique: [true, "the provided staff id is not unique"],
    required: [true, "please enter the staff id"],
  },
  email: {
    type: String,
    unique: [true, "the email entered is not unique"],
    required: [true, "please provide an email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female"],
      message: "please enter a valid gender (Male,Female)",
    },
  },
  dayOff: {
    type: String,
    enum: {
      values: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      message: "{VALUE} is not an valid day",
    },
  },
  leaveBalance: {
    type: Number,
    min: 0
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
    min: 0,
    max: 6
  },
  officeLocationID: { type: Schema.Types.ObjectId, ref: "Location" },
  salary: {
    type: Number,
    min: [0, 'salary should not be negative']
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
      message:
        'please endter a valid role from these values: ["HR", "Course Coordinator", "Course Instructor", "TA", "HOD"]',
    },
    required: [true, 'please provide a role']
  },
  schedule: {
    type: [Slot],
  },
  salaryDeduction: {
    type: Number,
    default: 0,
    min: 0
  }
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

  const { staffID, schedule } = user;
  if (schedule) {
    user.schedule = schedule.map((slot) => {
      slot.staffID = staffID;
      return slot;
    });
    user.markModified("staffID");
  }
  next();
});
schema.pre("save", async function (next) {
  next();
});

// Delete user tasks when user is removed
/* schema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
}); */
module.exports = schema;
