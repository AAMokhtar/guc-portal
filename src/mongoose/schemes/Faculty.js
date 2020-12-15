const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Faculty = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  departmentsIDs: [{ type: Schema.Types.ObjectId, ref: "Department" }],
});
module.exports = mongoose.model("Faculty", Faculty);
