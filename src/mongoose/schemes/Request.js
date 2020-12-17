const mongoose = require("mongoose");
const LinkingSlot = require("./LinkingSlot");
const Replacement = require("./Replacement");
const Schema = mongoose.Schema;

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
    ref: "Staff",
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
  leave: {
    type: Leave,
  },
  linkingSlot: {
    type: LinkingSlot,
  },
  dayOff: {
    type: DayOff,
  },
  replacement: {
    type: Replacement,
  },
});
module.exports = schema;
