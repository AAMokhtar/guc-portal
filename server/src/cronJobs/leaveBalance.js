const Staff = require('../mongoose/dao/staff');
const chalk = require("chalk");

const blue = chalk.bold.blue;

module.exports = async function(){
    const cursor = Staff.find().cursor();

    for (let user = await cursor.next(); user != null; user = await cursor.next()) {
        user.leaveBalance += 2.5;
        
        //save document
        await user.save();
    }

    console.log(blue("new month's leave balance added!"));

}

