const mongoose = require('mongoose');
const schema = require("../schemes/Leave");

module.exports = mongoose.model("Leave", schema);
