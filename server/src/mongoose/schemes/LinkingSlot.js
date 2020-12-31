const mongoose = require("mongoose");
const Slot = require("./Slot");
const Schema = mongoose.Schema;
const schema = new Schema({
  slot: {
    type: Slot,
    required: true,
  },
});

module.exports = schema;
