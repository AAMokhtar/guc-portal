const mongoose = require("mongoose");
const Slot = require("./slot.js");
const Schema = mongoose.Schema;
const schema = new Schema({
  replacementDay: {
    type: Date,
    required: true,
  },
  replacementSlot: {
    type: Slot,
    required: true,
  },
});

module.exports = schema;
