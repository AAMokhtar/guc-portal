const mongoose = require('mongoose');
const schema = require("../schemes/Slot");

module.exports = mongoose.model("Slot", schema);
