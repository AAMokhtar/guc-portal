const mongoose = require("mongoose");
const request = require("Request.js");
const schema = request.discriminator(
  "Replacement",
  new mongoose.Schema({
    replacementDay: {
      type: Date,
      required: true,
    },
  })
);
module.exports = schema;
