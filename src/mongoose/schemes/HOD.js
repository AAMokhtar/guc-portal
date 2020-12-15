const mongoose = require("mongoose");
const academic = require("Academic.js");
const Schema = mongoose.Schema;

const schema = academic.discriminator(
  "HOD",
  new mongoose.Schema({
    hodID: {
      type: [Schema.Types.ObjectId],
      ref: "Academic",
      required: true,
    },
  })
);
module.exports = schema;
