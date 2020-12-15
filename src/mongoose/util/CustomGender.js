/////////////////////////////////////////////
//////// NOT NEEDED SO FAR ///////////
///////////////////////////////////////////////

const mongoose = require("mongoose");
let enums = ["Male", "Female"];

export class CustomGender extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, "CustomGender");
  }
  // `cast()` takes a parameter that can be anything. You need to
  // validate the provided `val` and throw a `CastError` if you
  // can't convert it.
  cast(val) {
    if (typeof val === "string" && enums.includes(val)) {
      return val;
    }
    throw new Error("CustomGender: " + val + " is not a gender");
  }
}
