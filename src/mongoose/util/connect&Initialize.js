const mongoose = require('mongoose');
const properties = require('../../../properties');
const chalk = require('chalk');

const connected = chalk.bold.green;
const error = chalk.bold.red;
const disconnected = chalk.bold.yellow;
const termination = chalk.bold.magenta;
  
//export this function and imported by server.js
module.exports = function(callback){
  
    //========================================
    mongoose.connect(properties.CONNECTION_STRING, 
      {useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true 
      });
  
    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open"));

        //initialize schemas;
        require("../dao/course");
        require("../dao/dayOff");
        require("../dao/department");
        require("../dao/faculty");
        require("../dao/leave");
        require("../dao/linkingSlot");
        require("../dao/location");
        require("../dao/notification");
        require("../dao/replacement");
        require("../dao/request");
        require("../dao/schedule");
        require("../dao/slot");
        require("../dao/staff");

        callback();
      });
  
    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
      });
  
    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
      });
  
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0);
        });
      });
  }