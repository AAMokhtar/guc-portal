const mongoose = require("mongoose");
const Request = require("Request.js");
const Schema = mongoose.Schema;

const schema = Request.discriminator(
  "DayOff",
  new mongoose.Schema({
    requestedDayOff: {
      type: String,
      enum: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      required: true,
    },
  })
);
module.exports = schema;
