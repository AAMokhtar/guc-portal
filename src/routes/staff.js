var express = require("express");
var router = express.Router();

const HTTP_CODES = require("./r_util/httpCodes");
const bcrypt = require("bcryptjs");
const isEmail = require("isemail");

//=====================:-MODELS-:======================

const Staff = require("../mongoose/dao/staff.js");
const Request = require("../mongoose/dao/request.js");
const faculty = require("../mongoose/dao/faculty");
const Location = require("../mongoose/dao/location");

//=====================:-ROUTES-:======================
/**
 * fetch current user from the database
 */
router.get("/myprofile", async function (req, res) {
  //get the user
  const user = await Staff.findOne({ staffID: req.user.staffID });

  //user does not exist
  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  //remove sensitive info
  user.set("password", null); // password is null

  //otherwise return the user
  return res.status(HTTP_CODES.OK).send(user);
});

//logout from the system
router.get("/logout", async function (req, res) {
  try {
    let { staffID: uID, objectID } = req.user;
    let user = await Staff.findOne({ staffID: uID });
    const token = req.header("auth-token");
    user["tokens"].push(token);
    await user.save();

    res.status(HTTP_CODES.OK).json({
      result: "success",
    });

    // make sure staff id is valid
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      msg: error.message,
    });
  }
});

/**
 * update a user's info.
 * NOTE: academic members can’t update their salary, faculty and department.
 * req.body contains the updated user
 * @param email is the updated emai;
 * @param password is the updated password
 * @param gender is the updated gender
 * @param officeLocation is the updated office location name
 * @param facultyName is the name of the updated faculty
 * @param departmentName is the name of the updated department
 * @param others is any extra info the user wants to provide (JSON)
 */

router.put("/updateprofile", async function (req, res) {
  const curid = req.user.staffID;

  var updatedUser = req.body;
  var user = await Staff.findOne({ staffID: curid });

  //undefined document --> not found
  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  /**
   * the users are unauthorized to update the following:
   * staffID
   * name
   * dayOff
   * leaveBalance
   * attendance
   * accidentDays
   * notifications
   * role
   * schedule
   * courseIDs
   */

  //academic members cannot update their salary, faculty, department
  if (curid.startsWith("h")) {
    //get object ids of new faculty + department. verify that
    //this department falls under the faculty

    //=================FACULTY=================
    //if faculty name provided, find it and update the user
    if (updatedUser.facultyName) {
      const userFaculty = await faculty.findOne({
        name: updatedUser.facultyName.toUpperCase(),
      });

      if (!userFaculty) {
        return res.status(HTTP_CODES.NOT_FOUND).json({
          msg: "no faculty exists with the name " + updatedUser.facultyName,
        });
      }

      //manually populating + updating faculty
      user.facultyID = userFaculty;
    }

    //faculty name is not provided, populate the users's current faculty
    else {
      user.populate("facultyID");
    }

    //=================DEPARTMENT=================
    //user want to update the department
    if (updatedUser.departmentName) {
      userFaculty = user.facultyID;

      //department exists
      var dep = await Department.findOne({
        name: updatedUser.departmentName.toUpperCase(),
      });

      //get id
      if (dep) dep = dep._id;

      //exists under department
      const depExists = userFaculty.departments.filter((item) => {
        return item._id.equals(dep);
      });

      //no department exists with that name
      if (depExists.length == 0) {
        return res.status(HTTP_CODES.NOT_FOUND).json({
          msg:
            "no department exists with the name" +
            updatedUser.departmentName +
            " under the faculty " +
            userFaculty.name,
        });
      }

      //update the user's department
      user.departmentID = dep;
    }
  }

  //=================EMAIL=================
  //email is provided
  if (updatedUser.email) {
    if (!isEmail.validate(updatedUser.email)) {
      return res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ msg: "Please enter a valid email address" });
    }
  }

  //============OFFICE-LOCATION=============
  //user provided an office location
  if (updatedUser.officeLocation) {
    const office = await Location.findOne({
      name: updatedUser.officeLocation.toUpperCase(),
    });

    //location does not exist
    if (!office) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ msg: "office location does not exist" });
    }

    //location is not an office
    if (office.type != "OFFICE") {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ msg: "the office location provided is not of type office" });
    }

    //update the user's office location
    user.officeLocationID = office._id;
  }

  if (updatedUser.others) {
    user.others = updatedUser.others;
  }

  if (updatedUser.password) {
    user.password = updatedUser.password;
  }

  //should they update role or schedule from here?

  //save the updated user document
  await user.save();

  return res.status(HTTP_CODES.OK).send(user);
});

/**
 * Reset a user's password
 * @param curPassword is the user's current password (before updating)
 * @param newPassword is the user's new password (after updating)
 */
router.put("/resetpassword", async function (req, res) {
  const curid = req.user.staffID;
  var user = await Staff.findOne({ staffID: curid });

  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  //current password(entered in body) matches the existing one
  const curPassMatch = await bcrypt.compare(
    req.body.curPassword,
    user.password
  );

  if (!curPassMatch) {
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ msg: "current password is incorrect" });
  }

  //new password(entered in body) matches the existing one
  const newPassMatch = await bcrypt.compare(
    req.body.newPassword,
    user.password
  );

  if (newPassMatch) {
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ msg: "new password cannot be the same as the current password" });
  }

  //update the user document (hashing is done on .save())
  user.password = req.body.newPassword;
  await user.save();

  return res.status(HTTP_CODES.OK).send(user);
});

/**
 * Sign a user into the system
 */

router.put("/signin", async function (req, res) {
  //get the user document
  const curid = req.user.staffID;
  var user = await Staff.findOne({ staffID: curid });

  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  //now
  var curDateTime = new Date();

  //curDateTime but with time set to 00:00
  var curDate = new Date();
  curDate.setUTCHours(0, 0, 0, 0);

  //get today's attendance from the array
  const curAtt = user.attendance.find((elem) => +elem.date == +curDate);

  if (!curAtt) {
    return res
      .status(HTTP_CODES.NOT_FOUND)
      .json({ msg: "attendance record not found" });
  }

  //user cannot sign in twice without signing out in between
  if (curAtt.signIn.length > curAtt.signOut.length) {
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ msg: "you are already signed in" });
  }

  //register user signin
  curAtt.signIn.push(curDateTime);

  //update the user document
  await user.save();

  return res
    .status(HTTP_CODES.OK)
    .json({ msg: "successful sign in on " + curDateTime });
});

/**
 * Sign a user out of the system
 */
router.put("/signout", async function (req, res) {
  //get the user document
  const curid = req.user.staffID;
  var user = await Staff.findOne({ staffID: curid });

  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  //now
  var curDateTime = new Date();

  //curDateTime but with time set to 00:00
  var curDate = new Date();
  curDate.setUTCHours(0, 0, 0, 0);

  //get today's attendance from the array
  const curAtt = user.attendance.find((elem) => +elem.date == +curDate);

  if (!curAtt) {
    return res
      .status(HTTP_CODES.NOT_FOUND)
      .json({ msg: "attendance record not found" });
  }

  //user cannot sign out twice without signing out in between
  if (curAtt.signIn.length <= curAtt.signOut.length) {
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ msg: "you are not signed in" });
  }

  //register user signout
  curAtt.signOut.push(curDateTime);

  //update the user document
  await user.save();

  return res
    .status(HTTP_CODES.OK)
    .json({ msg: "successful sign out on " + curDateTime });
});

/**
 * return a user's attendance records this year
 * @param month is the number of the month we wish to filter by (1-12)
 */
router.get("/attendance/:month?", async function (req, res) {
  //get the user document
  const curid = req.user.staffID;
  var user = await Staff.findOne({ staffID: curid });

  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  //month filter is defined and is between 1 and 12
  var month = req.params.month - 1;
  const year = new Date().getFullYear();

  month =
    month !== undefined
      ? month >= 0 && month <= 11
        ? month
        : undefined
      : undefined;

  //get this year's attendance from the array
  var userAtt = user.attendance.filter(
    (elem) => elem.date.getFullYear() == year
  );

  //filter by month
  if (month !== undefined)
    userAtt = userAtt.filter((elem) => elem.date.getMonth() == month);

  //array of sign in dates and their corresponding sign out dates [{signIn: Date, signOut: Date}]
  var signInOut = [];

  //zip sign in and sign out together in signInOut
  userAtt.forEach((attDay) => {
    signInOut = signInOut.concat(
      attDay.signIn.map((elem, indx) => {
        //sign in without a sign out
        if (indx >= attDay.signOut.length) return undefined;

        return {
          signIn: elem,
          signOut: attDay.signOut[indx],
        };
      })
    );
  });
  //remove the undefined element corresponding to a sign in without a sign out
  if (!signInOut[signInOut.length - 1]) {
    signInOut.pop();
  }

  return res.status(HTTP_CODES.OK).send(signInOut);
});

/**
 * return a user's missing days so far for this month (11th to today)
 */
router.get("/missingdays", async function (req, res) {
  //get the user document
  const curid = req.user.staffID;
  var user = await Staff.findOne({ staffID: curid });

  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  //user's day off
  var dayOff = dayToInt(user.dayOff);

  //today in utc
  const curDate = new Date();
  curDate.setUTCHours(0, 0, 0, 0);

  var startDate;

  //start date in previous month
  if (curDate.getDate() < 11) {
    var year = curDate.getFullYear();
    var month = curDate.getMonth() - 1;

    if (month < 0) {
      month = 11;
      year--;
    }

    //11th of the previous month
    startDate = new Date(Date.UTC(year, month, 11, 0, 0, 0, 0));
  }
  //start date in current month
  else {
    var year = curDate.getFullYear();
    var month = curDate.getMonth() + 1;

    if (month > 11) {
      month = 0;
      year++;
    }

    //11th of the previous month
    startDate = new Date(
      Date.UTC(curDate.getFullYear(), curDate.getMonth(), 11, 0, 0, 0, 0)
    );
  }

  //filter the attendance to reduce the array as much as possible
  var missingDaysP1 = user.attendance.filter(
    (elem) =>
      elem.date >= startDate &&
      elem.date <= curDate &&
      (elem.signIn.length == 0 || elem.signOut.length == 0) &&
      elem.date.getDay() != 5 &&
      elem.date.getDay() != dayOff
  );

  //extract the dates from the attendace object
  missingDaysP1 = missingDaysP1.map((elem) => elem.date);

  //apply the expensive leave request filter on the reduced array
  var missingDays = [];
  for (const day of missingDaysP1) {
    const off = await acceptedLeaveOnDate(user._id, day);
    if (!off) {
      missingDays.push(day);
    }
  }

  //return the missing days so far
  return res
    .status(HTTP_CODES.OK)
    .send({ total: missingDays.length, dates: missingDays });
});

/**
 * return a user's missing hours so far this month (11th to today)
 */
router.get("/missinghours", async function (req, res) {
  //get the user document
  const curid = req.user.staffID;
  var user = await Staff.findOne({ staffID: curid });

  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  //user's day off
  var dayOff = dayToInt(user.dayOff);

  //today in utc
  const curDate = new Date();
  curDate.setUTCHours(0, 0, 0, 0);

  var startDate;

  //start date in previous month
  if (curDate.getDate() < 11) {
    var year = curDate.getFullYear();
    var month = curDate.getMonth() - 1;

    if (month < 0) {
      month = 11;
      year--;
    }

    //11th of the previous month
    startDate = new Date(Date.UTC(year, month, 11, 0, 0, 0, 0));
  }
  //start date in current month
  else {
    var year = curDate.getFullYear();
    var month = curDate.getMonth() + 1;

    if (month > 11) {
      month = 0;
      year++;
    }

    //11th of the previous month
    startDate = new Date(
      Date.UTC(curDate.getFullYear(), curDate.getMonth(), 11, 0, 0, 0, 0)
    );
  }

  //filter the attendance to reduce the array as much as possible
  var attendedDaysP1 = user.attendance.filter(
    (elem) =>
      elem.date >= startDate &&
      elem.date <= curDate &&
      elem.signIn.length != 0 &&
      elem.signOut.length != 0 &&
      elem.date.getDay() != 5 &&
      elem.date.getDay() != dayOff
  );

  //apply the expensive leave request filter on the reduced array
  var attendedDays = [];
  for (const att of attendedDaysP1) {
    const off = await acceptedLeaveOnDate(user._id, att.date);
    if (!off) {
      attendedDays.push(att);
    }
  }

  var missingHourDays = [];
  var totalMissingHours = 0;

  attendedDays.forEach((attDay) => {
    var workedms = 0.0;

    //at 07:00AM
    var dayStart = new Date(
      Date.UTC(
        attDay.date.getFullYear(),
        attDay.date.getMonth(),
        attDay.date.getDate(),
        7,
        0,
        0,
        0
      )
    );

    //at 07:00PM
    var dayEnd = new Date(
      Date.UTC(
        attDay.date.getFullYear(),
        attDay.date.getMonth(),
        attDay.date.getDate(),
        19,
        0,
        0,
        0
      )
    );

    attDay.signIn.forEach((elem, indx) => {
      //sign in without a sign out
      if (indx >= attDay.signOut.length) return;

      //calculate the amount of milliseconds worked from 7AM to 7PM
      workedms +=
        Math.min(dayEnd.getTime(), attDay.signOut[indx].getTime()) -
        Math.max(dayStart.getTime(), elem.getTime());
    });

    //calculate the missing hours that day (required hours - worked hours)
    var missingHours = Math.max(8.4 - workedms / (1000 * 60 * 60), 0);
    //accumulate missing hours
    totalMissingHours += missingHours;

    if (missingHours > 0) {
      //push the missing hours info
      missingHourDays.push({
        date: attDay.date,
        missingHours: missingHours,
      });
    }
  });

  //return the missing hours so far
  return res
    .status(HTTP_CODES.OK)
    .send({ total: totalMissingHours, dates: missingHourDays });
});

/**
 * return a user's extra hours so far this month (11th to today)
 */
router.get("/extrahours", async function (req, res) {
  //get the user document
  const curid = req.user.staffID;
  var user = await Staff.findOne({ staffID: curid });

  if (!user) {
    return res.status(HTTP_CODES.NOT_FOUND).json({ msg: "user not found" });
  }

  //user's day off
  var dayOff = dayToInt(user.dayOff);

  //today in utc
  const curDate = new Date();
  curDate.setUTCHours(0, 0, 0, 0);

  var startDate;

  //start date in previous month
  if (curDate.getDate() < 11) {
    var year = curDate.getFullYear();
    var month = curDate.getMonth() - 1;

    if (month < 0) {
      month = 11;
      year--;
    }

    //11th of the previous month
    startDate = new Date(Date.UTC(year, month, 11, 0, 0, 0, 0));
  }
  //start date in current month
  else {
    var year = curDate.getFullYear();
    var month = curDate.getMonth() + 1;

    if (month > 11) {
      month = 0;
      year++;
    }

    //11th of the previous month
    startDate = new Date(
      Date.UTC(curDate.getFullYear(), curDate.getMonth(), 11, 0, 0, 0, 0)
    );
  }

  //filter the attendance to reduce the array as much as possible
  var extraDays = user.attendance.filter(
    (elem) =>
      elem.date >= startDate &&
      elem.date <= curDate &&
      elem.signIn.length != 0 &&
      elem.signOut.length != 0 &&
      (elem.date.getDay() == 5 || elem.date.getDay() == dayOff)
  );

  var extraHourDays = [];
  var totalExtraHours = 0;

  extraDays.forEach((attDay) => {
    var workedms = 0.0;

    //at 07:00AM
    var dayStart = new Date(
      Date.UTC(
        attDay.date.getFullYear(),
        attDay.date.getMonth(),
        attDay.date.getDate(),
        7,
        0,
        0,
        0
      )
    );

    //at 07:00PM
    var dayEnd = new Date(
      Date.UTC(
        attDay.date.getFullYear(),
        attDay.date.getMonth(),
        attDay.date.getDate(),
        19,
        0,
        0,
        0
      )
    );

    attDay.signIn.forEach((elem, indx) => {
      //sign in without a sign out
      if (indx >= attDay.signOut.length) return;

      //calculate the amount of milliseconds worked from 7AM to 7PM
      workedms +=
        Math.min(dayEnd.getTime(), attDay.signOut[indx].getTime()) -
        Math.max(dayStart.getTime(), elem.getTime());
    });

    //convert the worked milliseconds to hours
    var extraHours = Math.max(workedms / (1000 * 60 * 60), 0);

    //accumulate extra hours
    totalExtraHours += extraHours;

    if (extraHours > 0) {
      //push the extra hours' info
      extraHourDays.push({
        date: attDay.date,
        extraHours: extraHours,
      });
    }
  });

  //return the extra hours so far
  return res
    .status(HTTP_CODES.OK)
    .send({ total: totalExtraHours, dates: extraHourDays });
});

//=======================:-HELPER FUNCTIONS-:=============================
async function acceptedLeaveOnDate(sender, date) {
  //all accepted leave requests for the user that enclose the parameter date
  var requests = await Request.find({
    senderID: sender,
    status: "Accepted",
    leave: { $exists: true },
    "leave.startDate": { $lte: date },
    "leave.endDate": { $gte: date },
  });

  return requests.length > 0;
}

function dayToInt(day) {
  switch (day) {
    case "Sunday":
      return 0;
    case "Monday":
      return 1;
    case "Tuesday":
      return 2;
    case "Wednesday":
      return 3;
    case "Thursday":
      return 4;
    case "Saturday":
      return 6;
    default:
      return 5;
  }
}

module.exports = router;
