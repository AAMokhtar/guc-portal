const mongoose = require("mongoose");
const properties = require("./server/properties");

const chalk = require("chalk");

const connected = chalk.bold.green;
const error = chalk.bold.red;
const disconnected = chalk.bold.yellow;
const termination = chalk.bold.magenta;

module.exports =  (callback) => {
  //========================================
  mongoose.connect(properties.CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  mongoose.connection.on("connected", function () {
    console.log(connected("Mongoose default connection is open"));

    //initialize schemas;
    require("./models/course");
    require("./models/dayOff");
    require("./models/department");
    require("./models/faculty");
    require("./models/leave");
    require("./models/linkingSlot");
    require("./models/location");
    require("./models/notification");
    require("./models/replacement");
    require("./models/request");
    require("./models/slot");
    require("./models/staff");

    const { db } = require("./models/staff");
    callback();
  });

  mongoose.connection.on("error", function (err) {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    );
  });

  mongoose.connection.on("disconnected", function () {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
