const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  departmentsIDs: [{ type: Schema.Types.ObjectId, ref: "Department" }],
});
module.exports = schema;
