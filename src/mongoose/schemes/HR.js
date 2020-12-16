const mongoose = require("mongoose");
const staff = require("Staff.js");
const Schema = mongoose.Schema;

const schema = staff.discriminator(
  "HR",
  new mongoose.Schema({
    /// this is not nice
    hrID: {
      type: [Schema.Types.ObjectId],
      ref: "Staff",
      required: true,
    },
  })
);
module.exports = schema;
