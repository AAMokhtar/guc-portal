//------------------------------------------------DEPENDENCIES--------------------------------------
var express = require("express");
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const { authenticateAndAuthoriseAC } = require("./auth.js");

//-----------------------------------------------END OF DEPENDENCIES----------------------------

//----------------------------------------------------------MULTER--------------------------------------------------

//required to deal with document uploads
const multer = require('multer');

//set the destination and filenames of the files to store
const storage = multer.diskStorage({
    //destination of the file to save
    destination: function (req, file, callback) {
        callback(null, "../../data/");
    },
    //the name given to the file to save
    filename: function (req, file, callback) {
        const fileName = req.user.objectID + '-' + Date.now();
        callback(null, fileName + '.zip');
    }
});

//validator function for the files uploaded
//check that they are in the zip format
function isZipFile(req, res, callback) {
    if (!file.originalname.match(/\.zip$/))
        return callback(new Error("File uploaded is not in the zip format."), false);

    return callback(null, true);

}

//uploading a single document under the field document of the request
const upload = multer({ storage: storage, fileFilter: isZipFile }).single('document');

//-----------------------------------------------------END OF MULTER--------------------------

//----------------------------------------HELPERS----------------------------------------------------

//checks if the array entered has all elements following the id format of an academic member
function validateACIDs(list) {
    //starts with ac-
    //preceded by a number from 1 to 9 (id starts at 0 so first number cannot be 0)
    //preceded by 0 or more numbers from 0 to 9
    //and nothing after that (\b)
    const re = /^ac-[1-9]\d*\b/;
    list.forEach(id => {
        //if an id is of the wrinf format
        if (!re.test(id))
            return false;
    });

    //if all passed the re test
    return true;
}

//checks if the string is of the valid date format yyyy-mm-dd
function validateDate(date) {
    const re = /\b\d\d\d\d-\d\d-\d\d\b/;

    if (re.test(date)) {
        const d = new Date(date);

        if (d instanceof Date && !isNaN(d))
            return d;
    }

    return false;
}

//----------------------------------END OF HELPERS-------------------------------------------------


//------------------------------------ENUMS------------------------------------------------------

const WEEKDAYS = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
];

//-----------------------------END OF ENUMS------------------------------------------------------

//--------------------------------------MODELS----------------------------------------------------

const Staff = require("../mongoose/dao/staff.js");
const Course = require("../mongoose/dao/course.js");
const Replacement = require("../mongoose/dao/replacement.js");
const Request = require("../mongoose/dao/request.js");
const Notification = require("../mongoose/dao/notification.js");
const Slot = require("../mongoose/dao/slot.js");
const LinkingSlot = require("../mongoose/dao/linkingSlot.js");
const Department = require("../mongoose/dao/department.js");
const Leave = require("../mongoose/dao/leave.js");
const DayOff = require("../mongoose/dao/dayOff.js");

//---------------------------------END OF MODELS--------------------------------------------------

//---------------------------------------ACADEMIC STAFF FUNCTIONALITIES-------------------------------------------------

//shows the schedule
router.get('/schedule', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the schedule of current user
        const schedule = (await Staff.findOne({ _id: user.objectID })).schedule;

        //arrays to store the slots
        let sat = new Object();
        let sun = new Object();
        let mon = new Object();
        let tue = new Object();
        let wed = new Object();
        let thu = new Object();

        //sort the schedule
        schedule.forEach((slot) => {

            if (slot.weekday === "Saturday") {
                if (slot.number === "First") {
                    sat.first = slot;
                }
                else if (slot.number === "Second") {
                    sat.second = slot;
                }
                else if (slot.number === "Third") {
                    sat.third = slot;
                }
                else if (slot.number === "Fourth") {
                    sat.fourth = slot;
                }
                else if (slot.number === "Fifth") {
                    sat.fifth = slot;
                }
            }
            else if (slot.weekday === "Sunday") {
                if (slot.number === "First") {
                    sun.first = slot;
                }
                else if (slot.number === "Second") {
                    sun.second = slot;
                }
                else if (slot.number === "Third") {
                    sun.third = slot;
                }
                else if (slot.number === "Fourth") {
                    sun.fourth = slot;
                }
                else if (slot.number === "Fifth") {
                    sun.fifth = slot;
                }
            }
            else if (slot.weekday === "Monday") {
                if (slot.number === "First") {
                    mon.first = slot;
                }
                else if (slot.number === "Second") {
                    mon.second = slot;
                }
                else if (slot.number === "Third") {
                    mon.third = slot;
                }
                else if (slot.number === "Fourth") {
                    mon.fourth = slot;
                }
                else if (slot.number === "Fifth") {
                    mon.fifth = slot;
                }
            }
            else if (slot.weekday === "Tuesday") {
                if (slot.number === "First") {
                    tue.first = slot;
                }
                else if (slot.number === "Second") {
                    tue.second = slot;
                }
                else if (slot.number === "Third") {
                    tue.third = slot;
                }
                else if (slot.number === "Fourth") {
                    tue.fourth = slot;
                }
                else if (slot.number === "Fifth") {
                    tue.fifth = slot;
                }
            }
            else if (slot.weekday === "Wednesday") {
                if (slot.number === "First") {
                    wed.first = slot;
                }
                else if (slot.number === "Second") {
                    wed.second = slot;
                }
                else if (slot.number === "Third") {
                    wed.third = slot;
                }
                else if (slot.number === "Fourth") {
                    wed.fourth = slot;
                }
                else if (slot.number === "Fifth") {
                    wed.fifth = slot;
                }
            }
            else if (slot.weekday === "Thursday") {
                if (slot.number === "First") {
                    thu.first = slot;
                }
                else if (slot.number === "Second") {
                    thu.second = slot;
                }
                else if (slot.number === "Third") {
                    thu.third = slot;
                }
                else if (slot.number === "Fourth") {
                    thu.fourth = slot;
                }
                else if (slot.number === "Fifth") {
                    thu.fifth = slot;
                }
            }
        });

        //fill empty slots
        if (!sat.first)
            sat.first = "Free";
        if (!sat.second)
            sat.second = "Free";
        if (!sat.third)
            sat.third = "Free";
        if (!sat.fourth)
            sat.fourth = "Free";
        if (!sat.fifth)
            sat.fifth = "Free";

        if (!sun.first)
            sun.first = "Free";
        if (!sun.second)
            sun.second = "Free";
        if (!sun.third)
            sun.third = "Free";
        if (!sun.fourth)
            sun.fourth = "Free";
        if (!sun.fifth)
            sun.fifth = "Free";

        if (!mon.first)
            mon.first = "Free";
        if (!mon.second)
            mon.second = "Free";
        if (!mon.third)
            mon.third = "Free";
        if (!mon.fourth)
            mon.fourth = "Free";
        if (!mon.fifth)
            mon.fifth = "Free";

        if (!tue.first)
            tue.first = "Free";
        if (!tue.second)
            tue.second = "Free";
        if (!tue.third)
            tue.third = "Free";
        if (!tue.fourth)
            tue.fourth = "Free";
        if (!tue.fifth)
            tue.fifth = "Free";

        if (!wed.first)
            wed.first = "Free";
        if (!wed.second)
            wed.second = "Free";
        if (!wed.third)
            wed.third = "Free";
        if (!wed.fourth)
            wed.fourth = "Free";
        if (!wed.fifth)
            wed.fifth = "Free";

        if (!thu.first)
            thu.first = "Free";
        if (!thu.second)
            thu.second = "Free";
        if (!thu.third)
            thu.third = "Free";
        if (!thu.fourth)
            thu.fourth = "Free";
        if (!thu.fifth)
            thu.fifth = "Free";


        //add the days together into one object as the  whole schedule
        const sch = { sat: sat, sun: sun, mon: mon, tue: tue, wed: wed, thu: thu };
        //return the schedule
        return res.status(200).json({ schedule: sch });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }

});


//shows the replacment requests sent to the user
router.get('/replacement-request', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the notifications of the user
        const notifs = (await Staff.findOne({ staffID: user.staffID })).notifications;

        //filters notifications to get only the replacement ones and return the requests themselves
        let RepReqs = [];
        notifs.forEach(notif => {
            //if the notification is replacement and sent to the academic member
            if (notif.message.replacement && notif.message.receiverID.equals(user.objectID)) {
                //remove the unnecessary attributes 
                let { leave, dayOff, linkingSlot, ...RepReq } = notif.message;
                RepReqs.push(RepReq);
            }
        });

        const result = RepReqs.map(a => a.$__parent);
        //if there are slot linking notifications return them to the user
        if (result && result.length > 0)
            return res.status(200).json({ requests: result });
        //otherwise return a message indicating ther is no notification to show
        else
            return res
                .status(200)
                .json({ msg: "There are currently no replacement requests." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);


//sends a replacment request
router.post('/replacement-request/send', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the replacement date entered
        //and an array of staffIDs (in the same order of the slots) to cover the slots
        const { replacementDate, slotRep } = req.body;



        if (!replacementDate)
            return res.status(400).json({ msg: "Please enter a date for replacement." });

        if (!slotRep)
            return res.status(400).json({ msg: "Please enter an array of staff IDs for replacement (in the same order of the slots to be covered)." });

        const repDate = validateDate(replacementDate);
        if (!repDate)
            return res.status(400).json({ msg: "Please enter replacementDate as a valid date string (yyyy-mm-dd)." });

        //check if the array entered has academic staffIDs in the right format
        if (!validateACIDs(slotRep))
            return res.status(400).json({ msg: "Please enter slotRep as an array of valid academic staff ids." });



        //get the weekday associated with the day to be replaced (base 0 for sunday)
        switch (repDate.getDay()) {
            case 0:
                weekday = "Sunday";
                break;
            case 1:
                weekday = "Monday";
                break;
            case 2:
                weekday = "Tuesday";
                break;
            case 3:
                weekday = "Wednesday";
                break;
            case 4:
                weekday = "Thursday";
                break;
            case 5:
                weekday = "Friday";
                break;
            case 6:
                weekday = "Saturday";
        };

        //get the slots available on that day

        const sender = await Staff.findOne({ _id: user.objectID });
        const schedule = sender.schedule;

        let slt = [];
        for(i=0; i<schedule.length; i++)
        {
            if(schedule[i].weekday===weekday)
                slt.push(schedule[i]);
        }

        //sort the slots
        let slots = [];
        let first, second, third, fourth, fifth;

        slt.forEach(s => {
            switch (s.number) {
                case "First":
                    first = s;
                    break;
                case "Second":
                    second = s;
                    break;
                case "Third":
                    third = s;
                    break;
                case "Fourth":
                    fourth = s;
                    break;
                case "Fifth":
                    fifth = s;
                    break;
            }
        });

        if (first)
            slots.push(first);
        if (second)
            slots.push(second);
        if (third)
            slots.push(third);
        if (fourth)
            slots.push(fourth);
        if (fifth)
            slots.push(fifth);


        //if there are no slots => error message
        if (slots.length === 0)
            return res.status(400).json({ msg: "There are no slots to replace." });

        //if the length of slots !== length of slotRep => error message
        if (slots.length !== slotRep.length)
            return res.status(400).json({ msg: "Please enter the amount of staff ids equal to the number of non free slots on the replacement day." });


        //check if the courses of those slots could be covered by the staffIDs entered
        let repStaff = [];

        for (i = 0; i < slots.length; i++) {
            const staff = await Staff.findOne({ staffID: slotRep[i] });

            //if there is no staff with the staff id entered
            if (!staff)
                return res.status(404).json({ msg: "There is no staff with the id: " + slotRep[i] });

            repStaff.push(staff);

            if (!(staff.courseIDs.includes(slots[i].course)))
                return res.status(400).json({ msg: "Staff " + slotRep[i] + " does not teach " + (await Course.findById(slots[i].course)).courseCode });
        }


        //send the request

        //A)create replacement requests

        for (i = 0; i < slots.length; i++) {

            await Replacement.create({ replacementDay: repDate, replacementSlot: slots[i] }, async (err, rep) => {
                if (err) throw err;

                await Request.create({ senderID: user.objectID, receiverID: repStaff[i]._id, status: "Pending", replacement: rep, sentDate: Date.now() }, async (err, rq) => {
                    if (err) throw err;

                    console.log("here.");
    
                    await Notification.create({ message: rq, date: Date.now(), read: false }, async (err, notif) => {
                        if (err) throw err;
                        
                        console.log("Here");
                        
                        //add notification to sender
                        sender.notifications.push(notif);
                        await sender.save();
                        //add notification to receiver
                        repStaff[i].notifications.push(notif);
                        await repStaff[i].save();
        
        
                    });

            });
        });
    }

        
        return res.status(200).json({ msg: "Replacement requests sent." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//sends a slot linking request
router.post('/slot-linking-request/send', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the objectID of the slot
        const { slotID } = req.body;


        if (!slotID)
            return res.status(400).json({ msg: "Please enter an id of the slot requested." });


        //if there is no such slot
        const slot = await Slot.findById(slotID);

        if (!slot)
            return res.status(404).json({ msg: "There is no slot with the id entered." });


        //if the slot is not within the courses taught by the sender
        const sender = await Staff.findById(user.objectID);
    

        if (!sender.courseIDs.includes(slot.course))
            return res.status(400).json({ msg: "The course of the slot requested is not within the courses assigned to the user." });


        //if the slot is already taken by another staff

        //const taken = await Staff.findOne( { role: { $ne: "HR"}, schedule: { slot: { _id: slotID } } } );
        const taken = slot.staffID;

        if (taken)
            return res.status(500).json({ msg: "Another staff member was assigned to that slot." });


        //if there are contradicting slots (either in schedule or sl request already sent)

        //in the schedule
        sender.schedule.forEach(schSlot => {
            if (schSlot.weekday === slot.weekday && schSlot.number === slot.number)
                return res.status(400).json({ msg: "There is already a slot assigned during the requested slot's time." });
        });


        //in the sl requests sent
        sender.notifications.forEach(notif => {
            if (notif.message.senderID.equals(user.objectID) && notif.message.linkingSlot && notif.message.status !== "Rejected" &&
                notif.message.linkingSlot.slot.weekday === slot.weekday && notif.message.linkingSlot.slot.number === slot.number)
                return res.status(400).json({ msg: "There is a slot linking request sent for a slot during the requested slot's time." });
        });



        //send the request


        const {coordinatorID}= await Course.findById(slot.course, { _id: 0, coordinatorID: 1 });

        //A) create an LS
        await LinkingSlot.create({ slot: slot }, async (err, ls) => {
            if (err) throw err;

            //B) create a req
            await Request.create({
                senderID: user.objectID, receiverID: coordinatorID, status: "Pending",
                linkingSlot: ls, sentDate: Date.now()
            }, async (err, rq) => {
                if (err) throw err;

                //C) create notification and send to sender and receiver
                await Notification.create({ message: rq, date: Date.now(), read: false }, async (err, notif) => {
                    if (err) throw err;

                    //send notification to sender
                    sender.notifications.push(notif);
                    await sender.save();

                    //send notification to coordinator
                    await Staff.findByIdAndUpdate(coordinatorID, {
                        $push: { notifications: notif }
                    });
                });
            });
        });


        return res.status(200).json({ msg: "Slot linking request sent." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//sends a change day off request
router.post('/day-off-request/send', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //gets the string denoting which weekday
        //and string denoting reason (optional) => to be added int the comment of request
        const { dayOff, reason } = req.body;

        //if no day off entered

        if (!dayOff)
            return res.status(400).json({ msg: "Please enter a weekday for the new day off." });


        //should be of the right format entered

        if (!WEEKDAYS.includes(dayOff))
            return res.status(400).json({ msg: "Please enter new day off as one of the following formats: " + WEEKDAYS });


        //if same day off of staff

        const sender = await Staff.findById(user.objectID);

        if (dayOff === sender.dayOff)
            return res.status(500).json({ msg: "New day off entered is the same as the what is currently assigned." });


        //if slot assigned on day off => error message

        sender.schedule.forEach(slot => {
            if (slot.weekday === dayOff)
                return res.status(400).json({ msg: "There is/are slot(s) assigned during the requested day off." });
        });


        //LS req associated with requested day off => if pending, delete

        const {hodID} = await Department.findById(sender.departmentID, { _id: 0, hodID: 1 });

        sender.notifications.forEach(async notif => {
            if (notif.message.linkingSlot && notif.message.linkingSlot.slot.weekday === dayOff && notif.message.status === "Pending") {
                await LinkingSlot.findByIdAndDelete(notif.message.linkingSlot._id, async (err, ls) => {
                    if (err) throw err;

                    await Request.findByIdAndDelete(notif.message._id, async (err, rq) => {
                        if (err) throw err;

                        //delete from notifications

                        await Notification.findByIdAndDelete(notif._id);

                        //delete from sender 

                        await Staff.findByIdAndUpdate(user.objectID, {
                            $pull: { notifications: { _id: notif._id } }
                        });

                        //delete from receiver

                        await Staff.findOneAndUpdate({ staffID: hodID }, {
                            $pull: { notifications: { _id: notif._id } }
                        });


                    });
                });
            }
        });

        //send the request

        //A) create a DayOff
        await DayOff.create({ requestedDayOff: dayOff }, async (err, dOff) => {
            if (err) throw err;

            //B) create a req
            await Request.create({
                senderID: user.objectID, receiverID: hodID, status: "Pending",
                dayOff: dOff, comment: reason, sentDate: Date.now()
            }, async (err, rq) => {
                if (err) throw err;

                //C) create notification and send to sender and receiver
                await Notification.create({ message: rq, date: Date.now(), read: false }, async (err, notif) => {
                    if (err) throw err;

                    //send notification to sender
                    sender.notifications.push(notif);
                    await sender.save();

                    //send notification to hod
                    await Staff.findByIdAndUpdate(hodID, {
                        $push: { notifications: notif }
                    });
                });
            });
        });


        return res.status(200).json({ msg: "Day off request sent." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//sends an annual leave request
router.post('/annual-leave-request/send', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //gets the start date for the accidental leave
        //the end date for the leave
        //and a string denoting the reason (optional)
        const { startLeaveDate, endLeaveDate, reason } = req.body;


        if (!startLeaveDate)
            return res.status(400).json({ msg: "Please enter start date for the accidental leave." });
        if (!endLeaveDate)
            return res.status(400).json({ msg: "Please enter the end date for the accidental leave." });



        //validate the dates

        const startDate = validateDate(startLeaveDate);

        if (!startDate)
            return res.status(400).json({ msg: "Please enter the accidental start leave date as a valid date string (yyyy-mm-dd)." });

        const endDate = validateDate(endLeaveDate);

        if (!endDate)
            return res.status(400).json({ msg: "Please enter the accidental end leave date as a valid date string (yyyy-mm-dd)." });


        //check that the end date is after the start date

        if (endDate.getTime() - startDate.getTime() < 0)
            return res.status(400).json({ msg: "End date should be after the start date." })


        //if the start leave date already passed

        if (startDate < Date.now())
            return res.status(400).json({ msg: "Annual leave start date already passed." });



        //check if the staff has enough annual leave balance

        const sender = await Staff.findById(user.objectID);

        let days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

        if (days === 0)
            days = 1;

        if (floor(sender.leaveBalance) < days)
            return res.status(500).json({ msg: "There is not enough annual leave balance for the requested accidental leave." });



        //produce a list of days for which there should be replacement

        let dayOff;

        switch (sender.dayOff) {
            case "Sunday": dayOff = 0; break;
            case "Monday": dayOff = 1; break;
            case "Tuesday": dayOff = 2; break;
            case "Wednesday": dayOff = 3; break;
            case "Thursday": dayOff = 4; break;
            case "Friday": dayOff = 5; break;
            case "Saturday": dayOff = 6; break;
            default: throw Error("Day Off input in the database does not follow valid format. ");
        }

        let workingDays = "";

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            let date = new Date(d);

            if (date.getDay() !== 5 && date.getDay() !== dayOff)
                workingDays = workingDays + date + '\n';
        }


        //send the annual leave request

        const {hodID} = await Department.findById(sender.departmentID, { _id: 0, hodID: 1 });

        //A) create a accidental leave
        await Leave.create({ leaveType: "Annual", reason: reason, startDate: startDate, endDate: endDate }, async (err, lv) => {
            if (err) throw err;

            //B) create a req
            await Request.create({
                senderID: user.objectID, receiverID: hodID, status: "Pending",
                leave: lv, sentDate: Date.now()
            }, async (err, rq) => {
                if (err) throw err;

                //C) create notification and send to sender and receiver
                await Notification.create({ message: rq, date: Date.now(), read: false }, async (err, notif) => {
                    if (err) throw err;

                    //send notification to sender
                    sender.notifications.push(notif);
                    await sender.save();

                    //send notification to hod
                    await Staff.findByIdAndUpdate(hodID, {
                        $push: { notifications: notif }
                    });
                });
            });
        });
        a
        return res.status(200).json({
            msg: "Annual leave request sent. Please send replacement requests for the following working days:" + '\n' +
                workingDays
        });


    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//sends an accidental leave request
router.post('/accidental-leave-request/send', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //gets the start date for the accidental leave
        //the end date for the leave
        //and a string denoting the reason (optional)
        const { startLeaveDate, endLeaveDate, reason } = req.body;


        if (!startLeaveDate)
            return res.status(400).json({ msg: "Please enter start date for the accidental leave." });
        if (!endLeaveDate)
            return res.status(400).json({ msg: "Please enter the end date for the accidental leave." });



        //validate the dates

        const startDate = validateDate(startLeaveDate);

        if (!startDate)
            return res.status(400).json({ msg: "Please enter the accidental start leave date as a valid date string (yyyy-mm-dd)." });

        const endDate = validateDate(endLeaveDate);

        if (!endDate)
            return res.status(400).json({ msg: "Please enter the accidental end leave date as a valid date string (yyyy-mm-dd)." });


        //check that the end date is after the start date

        if (endDate.getTime() - startDate.getTime() < 0)
            return res.status(400).json({ msg: "End date should be after the start date." })


        //TODO: submitted after the targeted day??

        //check if staff has enough accidental leaves

        const sender = await Staff.findById(user.objectID);

        let days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

        if (days === 0)
            days = 1;

        if (sender.accidentDays < days)
            return res.status(500).json({ msg: "There is not enough accidental leave days for the requested accidental leave." });


        //check if the staff has enough annual leave balance

        if (floor(sender.leaveBalance) < days)
            return res.status(500).json({ msg: "There is not enough annual leave balance for the requested accidental leave." });




        //send the accidental leave request


        const {hodID} = await Department.findById(sender.departmentID, { _id: 0, hodID: 1 });

        //A) create a accidental leave
        await Leave.create({ leaveType: "Accidental", reason: reason, startDate: startDate, endDate: endDate }, async (err, lv) => {
            if (err) throw err;

            //B) create a req
            await Request.create({
                senderID: user.objectID, receiverID: hodID, status: "Pending",
                leave: lv, sentDate: Date.now()
            }, async (err, rq) => {
                if (err) throw err;

                //C) create notification and send to sender and receiver
                await Notification.create({ message: rq, date: Date.now(), read: false }, async (err, notif) => {
                    if (err) throw err;

                    //send notification to sender
                    sender.notifications.push(notif);
                    await sender.save();

                    //send notification to hod
                    await Staff.findByIdAndUpdate(hodID, {
                        $push: { notifications: notif }
                    });
                });
            });
        });

        return res.status(200).json({ msg: "Accidental leave request sent." });



    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//sends a sick leave request
router.post('/sick-leave-request/send', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //gets the start date for the sick leave
        //the end date for the leave
        //and a string denoting the reason (optional)
        const { startLeaveDate, endLeaveDate, reason } = req.body;


        if (!startLeaveDate)
            return res.status(400).json({ msg: "Please enter start date for the sick leave." });
        if (!endLeaveDate)
            return res.status(400).json({ msg: "Please enter the end date for the sick leave." });



        //validate the dates

        const startDate = validateDate(startLeaveDate);

        if (!startDate)
            return res.status(400).json({ msg: "Please enter the sick start leave date as a valid date string (yyyy-mm-dd)." });

        const endDate = validateDate(endLeaveDate);

        if (!endDate)
            return res.status(400).json({ msg: "Please enter the sick end leave date as a valid date string (yyyy-mm-dd)." });


        //check that the end date is after the start date

        if (endDate.getTime() - startDate.getTime() < 0)
            return res.status(400).json({ msg: "End date should be after the start date." })


        //check if the start date more than 3 days too late (cannot send sick leave after more than 3 days after the date)

        if ((Date.now() - startDate.getTime()) / (60 * 60 * 24 * 1000) > 3)
            return res.status(400).json({ msg: "Sick leave start date is more than 3 days ago." });



        //check for the documents
        let fileName;
        upload(req, res, (err) => {
            if (err) throw err;

            if (!req.file)
                return res.status(400).json({ msg: "Please upload a zip file of documents." });

            fileName = req.file.filename;

        });



        //send the sick leave request

        const sender = await Staff.findById(user.objectID);

        const {hodID} = await Department.findById(sender.departmentID, { _id: 0, hodID: 1 });

        //A) create a sick leave
        await Leave.create({ leaveType: "Sick", reason: reason, startDate: startDate, endDate: endDate, document: "../../data/" + fileName }, async (err, lv) => {
            if (err) throw err;

            //B) create a req
            await Request.create({
                senderID: user.objectID, receiverID: hodID, status: "Pending",
                leave: lv, sentDate: Date.now()
            }, async (err, rq) => {
                if (err) throw err;

                //C) create notification and send to sender and receiver
                await Notification.create({ message: rq, date: Date.now(), read: false }, async (err, notif) => {
                    if (err) throw err;

                    //send notification to sender
                    sender.notifications.push(notif);
                    await sender.save();

                    //send notification to hod
                    await Staff.findByIdAndUpdate(hodID, {
                        $push: { notifications: notif }
                    });
                });
            });
        });

        return res.status(200).json({ msg: "Sick leave request sent." });


    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//sends a maternity leave request
router.post('/maternity-leave-request/send', authenticateAndAuthoriseAC, async (req, res) => {
    try {

        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //gets the start date for the maternity leave
        //the end date for the leave
        //and a string denoting the reason (optional)
        const { startLeaveDate, endLeaveDate, reason } = req.body;


        if (!startLeaveDate)
            return res.status(400).json({ msg: "Please enter start date for the maternity leave." });
        if (!endLeaveDate)
            return res.status(400).json({ msg: "Please enter the end date for the maternity leave." });



        //validate the dates

        const startDate = validateDate(startLeaveDate);

        if (!startDate)
            return res.status(400).json({ msg: "Please enter the maternity start leave date as a valid date string (yyyy-mm-dd)." });

        const endDate = validateDate(endLeaveDate);

        if (!endDate)
            return res.status(400).json({ msg: "Please enter the maternity end leave date as a valid date string (yyyy-mm-dd)." });




        //check that the end date is after the start date

        if (endDate.getTime() - startDate.getTime() < 0)
            return res.status(400).json({ msg: "End date should be after the start date." })




        //check if the sender is female

        const sender = await Staff.findById(user.objectID);

        if (sender.gender === "Male")
            return res.status(400).json({ msg: "Only female staff can send maternity leaves." });



        ///check they are up to 3 months (90 days)

        if ((endDate.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000) > 90)
            return res.status(400).json({ msg: "Duration of maternity leave is more than three months (90 days)." });



        //if the start leave date already passed

        if (startDate < Date.now())
            return res.status(400).json({ msg: "Maternity leave start date already passed." });



        //check for the documents
        let fileName;
        upload(req, res, (err) => {
            if (err) throw err;

            if (!req.file)
                return res.status(400).json({ msg: "Please upload a zip file of documents." });

            fileName = req.file.filename;

        });



        //send the maternity leave request

        const {hodID} = await Department.findById(sender.departmentID, { _id: 0, hodID: 1 });

        //A) create a maternity leave
        await Leave.create({ leaveType: "Maternity", reason: reason, startDate: startDate, endDate: endDate, document: "../../data/" + fileName }, async (err, lv) => {
            if (err) throw err;

            //B) create a req
            await Request.create({
                senderID: user.objectID, receiverID: hodID, status: "Pending",
                leave: lv, sentDate: Date.now()
            }, async (err, rq) => {
                if (err) throw err;

                //C) create notification and send to sender and receiver
                await Notification.create({ message: rq, date: Date.now(), read: false }, async (err, notif) => {
                    if (err) throw err;

                    //send notification to sender
                    sender.notifications.push(notif);
                    await sender.save();

                    //send notification to hod
                    await Staff.findByIdAndUpdate(hodID, {
                        $push: { notifications: notif }
                    });
                });
            });
        });

        return res.status(200).json({ msg: "Maternity leave request sent." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//sends a compensation leave request
router.post('/compensation-leave-request/send', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //gets the date for the comp leave
        //a date to compensate in
        //and a string denoting the reason
        const { compensationLeaveDate, compensationDate, reason } = req.body;

        //user should enter all three
        if (!compensationLeaveDate)
            return res.status(400).json({ msg: "Please enter the date for the leave." });
        if (!compensationDate)
            return res.status(400).json({ msg: "Please enter the date for the compensation." });
        if (!reason)
            return res.status(400).json({ msg: "Please enter the reason for the compensation leave." });


        //check that the leave and compensation dates are dates
        const leaveDate = validateDate(compensationLeaveDate);
        if (!leaveDate)
            return res.status(400).json({ msg: "Please enter the compensation leave date as a valid date string (yyyy-mm-dd)." });
        const compDate = validateDate(compensationDate);
        if (!compDate)
            return res.status(400).json({ msg: "Please enter the compensation date as a valid date string (yyyy-mm-dd)." });


        //if the leave date already passed

        if (leaveDate < Date.now())
            return res.status(400).json({ msg: "Leave date input already passed." });

        //leave date is not a working day

        switch (leaveDate.getDay()) {
            case 0:
                weekday = "Sunday";
                break;
            case 1:
                weekday = "Monday";
                break;
            case 2:
                weekday = "Tuesday";
                break;
            case 3:
                weekday = "Wednesday";
                break;
            case 4:
                weekday = "Thursday";
                break;
            case 5:
                weekday = "Friday";
                break;
            case 6:
                weekday = "Saturday";
        };

        const sender = await Staff.findById(user.objectID);

        if (weekday === "Friday" || weekday === sender.dayOff)
            return res.status(400).json({ msg: "Date requested for the leave is already a day off." });


        //comp date should be a day off

        switch (compDate.getDay()) {
            case 0:
                compDay = "Sunday";
                break;
            case 1:
                compDay = "Monday";
                break;
            case 2:
                compDay = "Tuesday";
                break;
            case 3:
                compDay = "Wednesday";
                break;
            case 4:
                compDay = "Thursday";
                break;
            case 5:
                compDay = "Friday";
                break;
            case 6:
                compDay = "Saturday";
        }


        if (compDay !== "Friday" && compDay != sender.dayOff)
            return res.status(400).json({ msg: "Compensation date is not a day off." });



        //comp Date should be in the same month as leave (their weird month that starts at 11 and ends at 10?)

        let startDate, endDate;
        if (leaveDate.getDate() >= 11) {
            const year = leaveDate.getFullYear();
            const month = leaveDate.getMonth();
            startDate = new Date(year, month, 11);
            if (month === 11)
                endDate = new Date(year + 1, 0, 10);
            else
                endDate = new Date(year, month + 1, 10);

        }
        else {
            const year = leaveDate.getFullYear();
            const month = leaveDate.getMonth();
            if (month === 0)
                startDate = new Date(year - 1, 11, 11);
            else
                startDate = new Date(year, month - 1, 11);
            endDate = new Date(year, month, 10);
        }

        if (compDate > endDate || compDate < startDate)
            return res.status(400).json({ msg: "Compensation date is not within the same month as the leave." });




        //send the comp leave request

        const {hodID} = await Department.findById(sender.departmentID, { _id: 0, hodID: 1 });

        //A) create a compensation leave
        await Leave.create({ leaveType: "Compensation", reason: reason, startDate: leaveDate, endDate: leaveDate }, async (err, lv) => {
            if (err) throw err;

            //B) create a req
            await Request.create({
                senderID: user.objectID, receiverID: hodID, status: "Pending",
                leave: lv, sentDate: Date.now()
            }, async (err, rq) => {
                if (err) throw err;

                //C) create notification and send to sender and receiver
                await Notification.create({ message: rq, date: Date.now(), read: false }, async (err, notif) => {
                    if (err) throw err;

                    //send notification to sender
                    sender.notifications.push(notif);
                    await sender.save();

                    //send notification to hod
                    await Staff.findByIdAndUpdate(hodID, {
                        $push: { notifications: notif }
                    });
                });
            });
        });

        return res.status(200).json({ msg: "Compensation leave request sent." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);


//see notifications
router.get('/notifications', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;


        const sender = await Staff.findOne({ staffID: user.staffID });

        let subNotifs = [];

        sender.notifications.forEach(n => {
            if (n.message.senderID.equals(user.objectID))
                subNotifs.push(n);
        });

        //if there are notifications
        if (subNotifs.length > 0) {

            //assign them as read
            const subNotifsIds = subNotifs.map(a => a._id);

            sender.notifications.forEach(n => {
                if (subNotifsIds.includes(n._id))
                    n.read = true;
            });

            await sender.save();

            return res.status(200).json({ notifications: subNotifs });
        }
        //otherwise return a message indicating there is no notification to show
        else
            return res.status(200).json({ msg: "There are currently no notifications." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//see notifications that are accepted
router.get('/notifications/accepted', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        const sender = await Staff.findOne({ staffID: user.staffID });

        let accNotifs = [];

        sender.notifications.forEach(n => {
            if (n.message.senderID.equals(user.objectID) && n.message.status === "Accepted")
                accNotifs.push(n);
        });

        //if there are accepted notifications
        if (accNotifs.length > 0) {
            //assign them as read
            const accNotifIds = accNotifs.map(a => a._id);

            sender.notifications.forEach(n => {
                if (accNotifIds.includes(n._id))
                    n.read = true;
            });
            await sender.save();

            return res.status(200).json({ notifications: accNotifs });
        }
        //otherwise return a message indicating there is no notification to show
        else
            return res.status(200).json({ msg: "There are currently no accepted notifications." });


    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//see notifications that are rejected
router.get('/notifications/rejected', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        const sender = await Staff.findOne({ staffID: user.staffID });

        let rejNotifs = [];

        sender.notifications.forEach(n => {
            if (n.message.senderID.equals(user.objectID) && n.message.status === "Rejected")
                rejNotifs.push(n);
        });

        //if there are accepted notifications
        if (rejNotifs.length > 0) {
            //assign them as read
            const rejNotifsIds = rejNotifs.map(a => a._id);

            sender.notifications.forEach(n => {
                if (rejNotifsIds.includes(n._id))
                    n.read = true;
            });
            await sender.save();

            return res.status(200).json({ notifications: rejNotifs });
        }
        //otherwise return a message indicating there is no notification to show
        else
            return res.status(200).json({ msg: "There are currently no rejected notifications." });


    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);


//see requests
router.get('/requests', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the notifications of the user
        const notifs = (await Staff.findOne({ staffID: user.staffID })).notifications;

        //filters notifications to get only the requests themselves
        let reqs = [];
        notifs.forEach(notif => {
            //if the notification sent by the user
            if (notif.message.senderID.equals(user.objectID)) {
                if (notif.message.leave) {
                    //remove the unnecessary attributes 
                    let { linkingSlot, dayOff, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.linkingSlot) {
                    //remove the unnecessary attributes 
                    let { leave, dayOff, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.dayOff) {
                    //remove the unnecessary attributes 
                    let { leave, linkingSlot, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.replacement) {
                    //remove the unnecessary attributes 
                    let { leave, dayOff, linkingSlot, ...req } = notif.message;
                    reqs.push(req);
                }
            }
        });

        const result = reqs.map(a => a.$__parent);

        //if there are requests return them to the user
        if (result.length > 0)
            return res.status(200).json({ requests: result });
        //otherwise return a message indicating ther is no notification to show
        else
            return res
                .status(200)
                .json({ msg: "There are currently no sent requests." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//see requests that are accepted
router.get('/requests/accepted', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the notifications of the user
        const notifs = (await Staff.findOne({ staffID: user.staffID })).notifications;

        //filters notifications to get only the requests themselves
        let reqs = [];
        notifs.forEach(notif => {
            //if the notification sent by the user and are accepted
            if (notif.message.senderID.equals(user.objectID) && notif.message.status === "Accepted") {
                if (notif.message.leave) {
                    //remove the unnecessary attributes 
                    let { linkingSlot, dayOff, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.linkingSlot) {
                    //remove the unnecessary attributes 
                    let { leave, dayOff, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.dayOff) {
                    //remove the unnecessary attributes 
                    let { leave, linkingSlot, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.replacement) {
                    //remove the unnecessary attributes 
                    let { leave, dayOff, linkingSlot, ...req } = notif.message;
                    reqs.push(req);
                }
            }
        });

        const result = reqs.map(a => a.$__parent);

        //if there are requests return them to the user
        if (result.length > 0)
            return res.status(200).json({ requests: result });
        //otherwise return a message indicating ther is no notification to show
        else
            return res
                .status(200)
                .json({ msg: "There are currently no accepted sent requests." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//see requests that are rejected
router.get('/requests/rejected', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the notifications of the user
        const notifs = (await Staff.findOne({ staffID: user.staffID })).notifications;

        //filters notifications to get only the requests themselves
        let reqs = [];
        notifs.forEach(notif => {
            //if the notification sent by the user and are rejected
            if (notif.message.senderID.equals(user.objectID) && notif.message.status === "Rejected") {
                if (notif.message.leave) {
                    //remove the unnecessary attributes 
                    let { linkingSlot, dayOff, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.linkingSlot) {
                    //remove the unnecessary attributes 
                    let { leave, dayOff, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.dayOff) {
                    //remove the unnecessary attributes 
                    let { leave, linkingSlot, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.replacement) {
                    //remove the unnecessary attributes 
                    let { leave, dayOff, linkingSlot, ...req } = notif.message;
                    reqs.push(req);
                }
            }
        });

        const result = reqs.map(a => a.$__parent);

        //if there are requests return them to the user
        if (result.length > 0)
            return res.status(200).json({ requests: result });
        //otherwise return a message indicating ther is no notification to show
        else
            return res
                .status(200)
                .json({ msg: "There are currently no rejected sent requests." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//see requests that are pending
router.get('/requests/pending', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the notifications of the user
        const notifs = (await Staff.findOne({ staffID: user.staffID })).notifications;

        //filters notifications to get only the requests themselves
        let reqs = [];
        notifs.forEach(notif => {
            //if the notification sent by the user and are pending
            if (notif.message.senderID.equals(user.objectID) && notif.message.status === "Pending") {
                if (notif.message.leave) {
                    //remove the unnecessary attributes 
                    let { linkingSlot, dayOff, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.linkingSlot) {
                    //remove the unnecessary attributes 
                    let { leave, dayOff, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.dayOff) {
                    //remove the unnecessary attributes 
                    let { leave, linkingSlot, replacement, ...req } = notif.message;
                    reqs.push(req);
                }
                else if (notif.message.replacement) {
                    //remove the unnecessary attributes 
                    let { leave, dayOff, linkingSlot, ...req } = notif.message;
                    reqs.push(req);
                }
            }
        });

        //if there are requests return them to the user
        if (reqs.length > 0)
            return res.status(200).json({ requests: reqs });
        //otherwise return a message indicating ther is no notification to show
        else
            return res
                .status(200)
                .json({ msg: "There are currently no pending sent requests." });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);

//cancel a request 
router.delete('/requests/cancel', authenticateAndAuthoriseAC, async (req, res) => {
    try {
        //gets the payload of the token
        //the payload is stored in req.user in the authentication method
        const user = req.user;

        //get the request id of the request to cancel
        const { reqID } = req.body;

        if (!reqID)
            return res.status(400).json({ msg: "Please enter the id of the request you want to cancel." });


        //if there is no such request
        const request = await Request.findOne({ _id: reqID });
        if (!request)
            return res
                .status(404)
                .json({ msg: "There is no request with the id given." });


        //if the request is not sent by the user

        if (!request.senderID.equals(user.objectID))
            return res.status(400).json({ msg: "Request is sent by a different staff member." });


        //if the request already received a response

        if (request.status !== "Pending")
            return res.status(400).json({ msg: "Request already received a response." });


        //if the request's target day passed

        //leave => target day
        //replacement => target day
        //linking slot => no target day
        //day off => no target day

        if (request.leave) {
            if (request.leave.startDate < Date.now())
                return res.status(400).json({ msg: "Start date of leave already passed." })
        }
        else if (request.replacement) {
            if (request.replacement.replacementDate < Date.now())
                return res.status(400).json({ msg: "Replacement date already passed." });
        }


        //delete the request

        //LS
        if (request.linkingSlot) {
            //A) delete the LS
            await LinkingSlot.findByIdAndDelete( request.linkingSlot._id , async (err, ls) => {
                if (err) throw err;

                //B) delete the req
                await Request.findByIdAndDelete( request._id, async (err, rq) => {
                    if (err) throw err;

                    //C) delete notification and delete from sender and receiver
                    await Notification.findOneAndDelete({ "message._id": rq._id }, async (err, notif) => {
                        if (err) throw err;

                        //delete notification from sender
                        await Staff.findByIdAndUpdate( rq.senderID, {
                            $pull: {notifications: { _id: notif._id }}
                        });

                        //delete notification from receiver
                        await Staff.findByIdAndUpdate( rq.receiverID , {
                            $pull: {notifications: { _id: notif._id }}
                        });
                    });
                });
            });
        }
        //RP
        else if (request.replacement) 
        {
            //A) delete the RP
            await Replacement.findByIdAndDelete( request.replacementDate._id , async (err, rp) => {
                if (err) throw err;

                //B) delete the req
                await Request.findByIdAndDelete( request._id, async (err, rq) => {
                    if (err) throw err;

                    //C) delete notification and delete from sender and receiver
                    await Notification.findOneAndDelete({  "message._id": rq._id }, async (err, notif) => {
                        if (err) throw err;

                        //delete notification from sender
                        await Staff.findByIdAndUpdate( rq.senderID, {
                            $pull: {notifications: { _id: notif._id }}
                        });

                        //delete notification from receiver
                        await Staff.findByIdAndUpdate( rq.receiverID , {
                            $pull: {notifications: { _id: notif._id }}
                        });
                    });
                });
            });

        }
        //DO
        else if (request.dayOff) {
            //A) delete the DO
            await DayOff.findByIdAndDelete( request.dayOff._id , async (err, off) => {
                if (err) throw err;

                //B) delete the req
                await Request.findByIdAndDelete( request._id, async (err, rq) => {
                    if (err) throw err;

                    //C) delete notification and delete from sender and receiver
                    await Notification.findOneAndDelete({ "message._id": rq._id}, async (err, notif) => {
                        if (err) throw err;

                        //delete notification from sender
                        await Staff.findByIdAndUpdate( rq.senderID, {
                            $pull: {notifications: { _id: notif._id }}
                        });

                        //delete notification from receiver
                        await Staff.findByIdAndUpdate( rq.receiverID , {
                            $pull: {notifications: { _id: notif._id }}
                        });
                    });
                });
            });

        }
        //LEAVE
        else if (request.leave) {
            //A) delete the leave
            await Leave.findByIdAndDelete( request.leave._id , async (err, lv) => {
                if (err) throw err;

                //B) delete the req
                await Request.findByIdAndDelete( request._id, async (err, rq) => {
                    if (err) throw err;

                    //C) delete notification and delete from sender and receiver
                    await Notification.findOneAndDelete({ "message._id": rq._id }, async (err, notif) => {
                        if (err) throw err;

                        //delete notification from sender
                        await Staff.findByIdAndUpdate( rq.senderID, {
                            $pull: {notifications: { _id: notif._id }}
                        });

                        //delete notification from receiver
                        await Staff.findByIdAndUpdate( rq.receiverID , {
                            $pull: {notifications: { _id: notif._id }}
                        });
                    });
                });
            });

        }

        return res.status(200).json( {msg: "Request deleted."} );
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);


//-------------------------------------END OF ACADEMIC FUNCTIONALITIES---------------------------------------------

module.exports = router;
