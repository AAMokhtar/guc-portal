const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Leave");

module.exports = mongoose.model("Leave", schema);
