const mongoose = require("mongoose");
const academic = require("Academic.js");
const Schema = mongoose.Schema;

const schema = academic.discriminator(
  "CourseInstructor",
  new mongoose.Schema({
    ciId: {
      type: [Schema.Types.ObjectId],
      ref: "Academic",
      required: true,
    },
  })
);
module.exports = schema;
