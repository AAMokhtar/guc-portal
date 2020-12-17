const mongoose = require('mongoose');
const schema = require("../schemes/Schedule");

module.exports = mongoose.model("Schedule", schema);
