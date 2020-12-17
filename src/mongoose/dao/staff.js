const mongoose = require('mongoose');
const schema = require("../schemes/Staff");

module.exports = mongoose.model("Staff", schema);
