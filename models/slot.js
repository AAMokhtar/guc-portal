const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Slot");

module.exports = mongoose.model("Slot", schema);
