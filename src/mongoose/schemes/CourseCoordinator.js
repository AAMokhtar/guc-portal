const mongoose = require("mongoose");
const academic = require("Academic.js");
const Schema = mongoose.Schema;

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
