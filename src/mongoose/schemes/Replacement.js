const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  replacementDay: {
    type: Date,
    required: true,
  },
});

module.exports = schema;
