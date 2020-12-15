const mongoose = require("mongoose");
const Request = require("Request.js");
const Schema = mongoose.Schema;

const schema = Request.discriminator(
  "Replacement",
  new mongoose.Schema({
    replacementDay: {
      type: Date,
      required: true,
    },
  })
);
module.exports = schema;
