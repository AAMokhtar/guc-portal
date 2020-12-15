const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const Location = new Schema({
    Name:{ 
        type: String,
        required: true,
        unique:true
    },
    capacity: {
        type:Number,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          },
        required: true
    },
    currentlyTakenSeats: {
        type:Number,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          },
        required: true
    },
    Type: {
        type: String,
        enum: ['Hall', 'Lab', 'Tutorial','Office'],
        required: true
    }
});
module.exports= mongoose.model("Location", Location);
