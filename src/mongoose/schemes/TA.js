const mongoose = require("mongoose");
const Academic = require("Academic.js");
const Schema = mongoose.Schema;

const schema = Academic.discriminator(
  "TA",
  new mongoose.Schema({
    taID: {
      type: [Schema.Types.ObjectId],
      ref: "Academic",
      required: true,
    },
  })
);
module.exports = schema;
