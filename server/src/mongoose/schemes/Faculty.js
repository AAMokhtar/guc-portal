const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide the faculty name'],
    unique: [true, 'the provided faculty already exists']
  },
  departments: [{ type: Schema.Types.ObjectId, ref: "Department"}]
});
module.exports = schema;
