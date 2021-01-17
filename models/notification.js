const mongoose = require('mongoose');
const schema = require("../server/src/mongoose/schemes/Notification");

module.exports = mongoose.model("Notification", schema);
