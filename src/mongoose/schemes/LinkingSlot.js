const mongoose = require("mongoose");
const request = require("Request.js");
const schema = request.discriminator(
  "LinkingSlot",
  new mongoose.Schema({
    slot: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
  })
);
module.exports = mongoose.model("LinkingSlot", schema);
