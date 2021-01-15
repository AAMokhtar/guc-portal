const mongoose = require('mongoose');
const schema = require("../schemes/Department");
module.exports = mongoose.model("Department", schema);
