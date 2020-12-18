/**
 * ===============SCHEDULE YOUR JOBS BELOW======================
 * cron jobs are function's that run periodically according
 * to a cron expression.
 *
 * CronTab:
 *
 *  * * * * * *
 *  | | | | | |
 *  | | | | | day of week(0 - 6 sunday to saturday)
 *  | | | | month (1 - 12)
 *  | | | day of month(1 - 31)
 *  | | hour(0 - 23)
 *  | minute(0 - 59)
 *  second (0 - 59) [optional]
 *
 * A single asterisk(*) behaves like a wildcard. Meaning the 
 * task should be run for every instance of that unit 
 * of time. Five asterisks ('* * * * *') represents the crontab 
 * default of running every minute.
 * 
 * Numbers in the place of asterisks will be treated as values 
 * for that unit of time. Allowing you to schedule tasks to 
 * occur daily and weekly or in more complex.
 * 
 * POSSIBLE VALUES:
 * Asterisk (*) — to define all the scheduling parameters.
 * Comma (,) — to maintain two or more execution times of a single command.
 * Hyphen (-) — to determine the range of time when setting several execution times of a single command.
 * Slash (/) — for creating predetermined intervals of time in a specific range.
 * Last (L) — for the specific purpose to determine the last day of the week in a given month. For example, 3L means the last Wednesday.
 * Weekday (W) — to determine the closest weekday of a given time. For example, 1W means if the 1st is a Saturday, the command will run on Monday (the 3rd).
 * Hash (#) — for determining the day of the week, followed by a number ranging from 1 to 5. For example, 1#2 means the second Monday
 * Question mark (?) — to leave blank.
 * 
 * Popular expressions: https://crontab.guru/examples.html
 * 
 * STEPS NEEDED:
 * 1- create your function in a separate file
 * 2- import your function and schedule it here using the 
 * appropriate cronTab expression
 * 3- export your function.
 * 4- call cronJobs.<YOUR_FUNCTION>.start() in app.js
 *
 */

const cron = require('node-cron');


/**
 * Add next month's attendance on 
 * the 11th of each month at 12:00AM 
 */
const nextMonthAttendance = require('./nextMonthAttendance');
module.exports.nxtAtt =  cron.schedule('0 0 11 * *', nextMonthAttendance;