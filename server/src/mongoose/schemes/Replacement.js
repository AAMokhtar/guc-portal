const mongoose = require("mongoose");
const Slot = require("./Slot");
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
