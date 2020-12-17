const mongoose = require('mongoose');
const schema = require("../schemes/Faculty");

module.exports = mongoose.model("Faculty", schema);
