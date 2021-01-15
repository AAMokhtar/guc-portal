const mongoose = require('mongoose');
const schema = require("../schemes/LinkingSlot");

module.exports = mongoose.model("LinkingSlot", schema);
