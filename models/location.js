const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Location");

module.exports = mongoose.model("Location", schema);
