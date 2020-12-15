const mongoose = require("mongoose");
const Request = require("Request.js");
const Schema = mongoose.Schema;

const schema = Request.discriminator(
  "LinkingSlot",
  new mongoose.Schema({
    slot: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
  })
);
module.exports = schema;
