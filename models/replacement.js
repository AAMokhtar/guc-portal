const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Replacement");

module.exports = mongoose.model("Replacement", schema);
