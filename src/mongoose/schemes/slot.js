const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const Slot = new Schema({
    weekday:{ 
        type: String,
        enum: ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'],
        required: true
    },
    Number: {
        type:String,
        enum: ['First','Second','Third','Fourth','Fifth'],
        required: true
    },
    Location: {type: Schema.Types.ObjectId, ref: 'Location'},
    Course: {type: Schema.Types.ObjectId, ref: 'Course'}
});
module.exports= mongoose.model("Slot", Slot);