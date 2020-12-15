const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
    required: true,
  },
  currentlyTakenSeats: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
    required: true,
  },
  type: {
    type: String,
    enum: ["Hall", "Lab", "Tutorial", "Office"],
    required: true,
  },
});
module.exports = schema;
