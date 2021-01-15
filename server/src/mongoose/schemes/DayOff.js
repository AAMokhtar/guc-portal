const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  requestedDayOff: {
    type: String,
    enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    required: true,
  },
});

module.exports = schema;
