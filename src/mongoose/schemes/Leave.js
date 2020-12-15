const mongoose = require("mongoose");
const request = require("Request.js");
const schema = request.discriminator(
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
