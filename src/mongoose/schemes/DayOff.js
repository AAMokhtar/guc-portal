const mongoose = require("mongoose");
const request = require('Request.js');
const schema = request.discriminator('DayOff', new mongoose.Schema({
  requestedDayOff: {
    type: String,
    enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    required: true,
  },
}));
module.exports = schema;
