const mongoose = require("mongoose");
const academic = require("Academic.js");
const schema = academic.discriminator(
  "CourseCoordinator",
  new mongoose.Schema({
    ccId: {
      type: [Schema.Types.ObjectId],
      ref: "Academic",
      required: true,
    },
  })
);
module.exports = schema;
