const mongoose = require('mongoose');
const schema = require("../schemes/DayOff");

module.exports = mongoose.model("DayOff", schema);
