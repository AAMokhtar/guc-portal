const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter the name of the location'],
    unique: [true, 'this location already exists'],
  },
  capacity: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
    required: [true, 'please enter the capacity'],
  },
  currentlyTakenSeats: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
    default: 0
  },
  type: {
    type: String,
    enum:{ 
      values: ["Hall",'hall', "Lab",'lab', "Tutorial",'tutorial', 'Office','office'],
      message: '{VALUE} is not a valid location type'

  },
    required: [true, 'please enter location type'],
  },
});
module.exports = schema;
