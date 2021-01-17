const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/DayOff");

module.exports = mongoose.model("DayOff", schema);
