const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const Course = new Schema({
    CourseCode:{ 
        type: String,
        required: true,
        unique: true
    },
    InstructorID: {type: Schema.Types.ObjectId, ref: 'Staff'},

    CoordinatorID: {type: Schema.Types.ObjectId, ref: 'Staff'},
    //course name
    TAList: [{ type: Schema.Types.ObjectId, ref: 'Staff'}],
    Slots: [{ type: Schema.Types.ObjectId, ref: 'Slot'}]
});
module.exports= mongoose.model("Course", Course);