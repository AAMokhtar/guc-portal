const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter location name'],
    unique: [true, 'this location already exists'],
  },
  capacity: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
    required: [true, 'please enter the capacity'],
    min: [0, 'room capacity should not be negative']
  },
  currentlyTakenSeats: {
    type: Number,
    validate:[
      {validator: Number.isInteger, msg: '{VALUE} is not an integer value'},
      {validator: correctTakenSeats, msg: "currently occupied seats should not be greater than the room's capacity"}
    ],
    min: [0, 'taken seats should not be negative'],
    default: 0
  },
  type: {
    type: String,
    enum:{ 
      values: ["HALL", "LAB", "TUTORIAL", 'OFFICE'],
      message: '{VALUE} is not a valid location type'

  },
    required: [true, 'please enter location type'],
  },
});
module.exports = schema;

//currentlyTakenSeats must be <= capacity
function correctTakenSeats(value) {
  // `this` is the mongoose document
  return this.capacity >= value;
}
