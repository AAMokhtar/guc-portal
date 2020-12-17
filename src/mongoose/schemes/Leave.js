const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
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
});
module.exports = schema;
