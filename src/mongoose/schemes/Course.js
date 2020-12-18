const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  instructorIDs: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
  coordinatorIDs: { type: Schema.Types.ObjectId, ref: "Staff" },
  //course name
  taList: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
});
module.exports = schema;
