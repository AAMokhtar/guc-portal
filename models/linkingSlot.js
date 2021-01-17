const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/LinkingSlot");

module.exports = mongoose.model("LinkingSlot", schema);
