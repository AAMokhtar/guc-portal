const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Faculty");

module.exports = mongoose.model("Faculty", schema);
