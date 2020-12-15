const mongoose = require("mongoose");
const staff = require('Staff.js');
const schema = staff.discriminator('Academic', new mongoose.Schema({
    academicId: {
        type: [Schema.Type.ObjectId],
        ref: "Staff",
        required: true,
    },
    schedule: {
    type: [Schema.Types.ObjectId],
    ref: "Slot",
    required: true,
  },
}));
module.exports = schema;
