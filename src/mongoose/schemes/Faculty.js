const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Department = require("./Department");
const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  departments: [Department],
});
module.exports = schema;
