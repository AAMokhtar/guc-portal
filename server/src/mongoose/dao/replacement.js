const mongoose = require('mongoose');
const schema = require("../schemes/Replacement");

module.exports = mongoose.model("Replacement", schema);
