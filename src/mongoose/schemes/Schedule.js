const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slot = new Schema({
  academicStaffID: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  departmentID: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
});
module.exports = mongoose.model("Schedule", slot);
