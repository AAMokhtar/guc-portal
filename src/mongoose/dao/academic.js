const mongoose = require('mongoose');
const schema = require("../schemes/Academic");
module.exports = mongoose.model("Academic", schema);
