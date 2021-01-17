const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Department");
module.exports = mongoose.model("Department", schema);
