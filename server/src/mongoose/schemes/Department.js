const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide the department name'],
    unique: [true, 'this department already exists']
  },
  faculty: {
    type: String,
    required: [true, 'please provide the faculty name']
  },
  coursesIDs: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  hodID: { type: Schema.Types.ObjectId, ref: "Staff" },

  hodStaffID: {
    type: String,
    default: "-"
  },
});
module.exports = schema;
