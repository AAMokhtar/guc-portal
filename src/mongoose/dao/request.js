const mongoose = require('mongoose');
const schema = require("../schemes/Request");

module.exports = mongoose.model("Request", schema);
