const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Slot = require("./Slot");
const schema = new Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  instructorIDs: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
  coordinatorID: { type: Schema.Types.ObjectId, ref: "Staff" },
  //course name
  taList: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
});
module.exports = schema;
