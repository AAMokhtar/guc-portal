const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const course = new Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  instructorID: { type: Schema.Types.ObjectId, ref: "Staff" },

  coordinatorID: { type: Schema.Types.ObjectId, ref: "Staff" },
  //course name
  taList: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
});
module.exports = mongoose.model("Course", course);
