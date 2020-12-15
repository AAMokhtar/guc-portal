const mongoose = require("mongoose");
const academic = require('Academic.js');
const schema = academic.discriminator('TA', new mongoose.Schema({
    taId: {
        type: [Schema.Type.ObjectId],
        ref: "Academic",
        required: true,
    },
}));
module.exports = schema;
