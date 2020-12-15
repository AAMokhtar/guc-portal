const mongoose = require("mongoose");
const academic = require("Academic.js");
const schema = academic.discriminator(
  "TA",
  new mongoose.Schema({
    taID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Academic",
      },
    ],
  })
);
module.exports = mongoose.model("TA", schema);
