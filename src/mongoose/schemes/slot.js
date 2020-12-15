const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slot = new Schema({
  weekday: {
    type: String,
    enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    required: true,
  },
  number: {
    type: String,
    enum: ["First", "Second", "Third", "Fourth", "Fifth"],
    required: true,
  },
  location: { type: Schema.Types.ObjectId, ref: "Location" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
});
module.exports = mongoose.model("Slot", slot);
