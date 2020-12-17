const mongoose = require('mongoose');
const schema = require("../schemes/Location");

module.exports = mongoose.model("Location", schema);
