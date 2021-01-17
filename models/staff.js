const mongoose = require("mongoose");
const schema = require("../server/src/mongoose/schemes/Staff");
const bcrypt = require("bcryptjs");

schema.statics = {
  async findByCredentials(email, password) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("Email is not registered");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  },
  async generateID(type) {
    if (type == "HR") {
      let res = await this.find({ role: "HR" }, "staffID");
      let temp = [];
      for (let i = 0; i < res.length; i++) {
        temp.push(Number(res[i].staffID.substring(3, res[i].staffID.length)));
      }
      if (temp.length != 0) return "hr-" + (Math.max(...temp) + 1);
      else return "hr-1";
    } else {
      let res = await this.find({ role: { $ne: "HR" } }, "staffID");
      let temp = [];
      for (let i = 0; i < res.length; i++) {
        temp.push(Number(res[i].staffID.substring(3, res[i].staffID.length)));
      }

      if (temp.length != 0) return "ac-" + (Math.max(...temp) + 1);
      else return "ac-1";
    }
  },
  async checkIfEmailExists(email) {
    let res = await this.find({ email });
    return res.length == 1 ? true : false;
  },
};
module.exports = mongoose.model("Staff", schema);
