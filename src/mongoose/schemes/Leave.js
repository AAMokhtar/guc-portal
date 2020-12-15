const mongoose = require("mongoose");
const Request = require("Request.js");
const Schema = mongoose.Schema;

const schema = Request.discriminator(
  "Leave",
  new mongoose.Schema({
    leaveType: {
      type: String,
      enum: ["Annual", "Accidental", "Sick", "Maternity", "Compensation"],
      required: true,
    },
    reason: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  })
);
module.exports = schema;
