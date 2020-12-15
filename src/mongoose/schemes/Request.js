const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  senderID: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
    /*  validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      }, */
  },
  receiverID: {
    type: Schema.Types.ObjectId,
    ref: "HOD",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
  },
  comment: {
    type: String,
  },
  sentDate: Date,
  responseDate: Date,
});
module.exports = schema;
