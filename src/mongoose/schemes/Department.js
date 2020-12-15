const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Department = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  coursesIDs: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  //are we even going to use facultyName?
  facultyID: { type: Schema.Types.ObjectId, ref: "Faculty" },
  HODID: { type: Schema.Types.ObjectId, ref: "Staff" },
});
module.exports = mongoose.model("Department", Department);
