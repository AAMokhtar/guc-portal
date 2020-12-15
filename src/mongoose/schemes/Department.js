const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  coursesIDs: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  hodID: { type: Schema.Types.ObjectId, ref: "Staff" },
});
module.exports = schema;
