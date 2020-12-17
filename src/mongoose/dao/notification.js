const mongoose = require('mongoose');
const schema = require("../schemes/Notification");

module.exports = mongoose.model("Notification", schema);
