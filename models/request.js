const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Request");

module.exports = mongoose.model("Request", schema);
