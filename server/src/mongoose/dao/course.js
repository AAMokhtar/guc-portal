const mongoose = require('mongoose');
const schema = require("../schemes/Course");
module.exports = mongoose.model("Course", schema);
