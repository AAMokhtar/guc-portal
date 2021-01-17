const Staff = require('../../../models/staff');
const chalk = require("chalk");

const blue = chalk.bold.blue;

module.exports = async function(){
    const cursor = Staff.find().cursor();

    for (let user = await cursor.next(); user != null; user = await cursor.next()) {
        var curDate = new Date();
        curDate.setUTCHours(0,0,0,0);

        //initialize attendance record
        user.attendance.push({
            date: curDate.toUTCString(),
            signIn: [],
            signOut: []
        });

        //get next day
        curDate.setUTCDate(curDate.getUTCDate() + 1);
        
        //for the rest of the month
        while(curDate.getUTCDate() != 11){
            //initialize attendance record
            user.attendance.push({
                date: curDate.toUTCString(),
                signIn: [],
                signOut: []
            });

            //get next day
            curDate.setUTCDate(curDate.getUTCDate() + 1);
        }

        //save document
        await user.save();
    }

    console.log(blue("new month's attendance added!"));

}

