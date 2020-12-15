const mongoose = require("mongoose");
const academic = require('Academic.js');
const schema = academic.discriminator('HOD', new mongoose.Schema({
    hodId: {
        type: [Schema.Type.ObjectId],
        ref: "Academic",
        required: true,
    },
}));
module.exports = schema;
