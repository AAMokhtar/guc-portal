const mongoose = require("mongoose");
const academic = require("Academic.js");
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
