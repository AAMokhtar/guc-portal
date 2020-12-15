const mongoose = require("mongoose");
const Request = require("./Request");
const schema = new mongoose.Schema({
  message: Request,
  /*   notificationType: {
    reason: {
      type: String,
      enum: ["", ""],
    },
    accepted: { type: Boolean, required: true },
  }, */
  date: { type: Date, default: Date.now() },
  read: { type: Boolean, default: false },
});
module.exports = schema;
