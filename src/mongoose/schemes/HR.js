const mongoose = require("mongoose");
const staff = require('Staff.js');
const schema = staff.discriminator('HR', new mongoose.Schema({
    hrID: {
        type: [Schema.Types.ObjectId],
        ref: "Staff",
        required: true,
    },
}));
module.exports = schema;
