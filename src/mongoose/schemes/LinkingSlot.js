const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  slot: {
    type: Schema.Types.ObjectId,
    ref: "Slot",
    required: true,
  },
});

module.exports = schema;
