const mongoose = require("mongoose");
const staff = require("./Staff.js");
const Schema = mongoose.Schema;
const schema = staff.discriminator(
  "Academic",
  new mongoose.Schema({
    academicID: {
      type: [Schema.Types.ObjectId],
      ref: "Staff",
      required: true,
    },
    schedule: {
      type: [Schema.Types.ObjectId],
      ref: "Slot",
      required: true,
    },
  })
);
module.exports = schema;
