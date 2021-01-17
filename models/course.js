const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Course");
module.exports = mongoose.model("Course", schema);
