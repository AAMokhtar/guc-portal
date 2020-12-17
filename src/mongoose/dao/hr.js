const mongoose = require('mongoose');
const schema = require("../schemes/HR");

module.exports = mongoose.model("HR", schema);
