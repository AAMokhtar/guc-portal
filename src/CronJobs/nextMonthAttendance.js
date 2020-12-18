const { cyan } = require('chalk');
const Staff = require('../mongoose/dao/staff');
const chalk = require("chalk");

const blue = chalk.bold.blue;

module.exports = async function(){
    const cursor = Staff.find().cursor();

    for (let user = await cursor.next(); user != null; user = await cursor.next()) {
    var curDate = new Date();
        curDate.setHours(0,0,0,0);

        //initialize attendance record
        user.attendance.push({
            date: curDate,
            signIn: [],
            signOut: []
        });

        //get next day
        curDate.setDate(curDate.getDate() + 1);
        
        //for the rest of the month
        while(curDate.getDate() != 11){

            //initialize attendance record
            user.attendance.push({
                date: curDate.toUTCString(),
                signIn: [],
                signOut: []
            });

            //get next day
            curDate.setDate(curDate.getDate() + 1);
        }

        //save document
        await user.save();
    }

    console.log(blue("new month's attendance added!"));

}

