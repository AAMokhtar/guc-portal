const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const Department = new Schema({
    name:{ 
        type: String,
        required: true,
        unique:true
    },
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
    HODID: {type: Schema.Types.ObjectId, ref: 'Staff'}
});
module.exports= mongoose.model("Department", Department);