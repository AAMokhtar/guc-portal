//------------------------------------------------DEPENDENCIES--------------------------------------
var express = require("express");
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const { authenticateAndAuthoriseAC } = require("./auth.js");

//-----------------------------------------------END OF DEPENDENCIES----------------------------

//----------------------------------------HELPERS----------------------------------------------------

//checks if the array entered has all elements following the id format of an academic member
function validateACIDs(list) {
    //starts with ac-
    //preceded by a number from 1 to 9 (id starts at 0 so first number cannot be 0)
    //preceded by 0 or more numbers from 0 to 9
    //and nothing after that (\b)
    let re = /^ac-[1-9]\d*\b/;
    list.forEach(id => {
        //if an id is of the wrinf format
        if (!re.test(id))
            return false;
    });

    //if all passed the re test
    return true;
}

//----------------------------------END OF HELPERS-------------------------------------------------

//--------------------------------------MODELS----------------------------------------------------

const Staff = require("../mongoose/dao/staff.js");
const Course = require("../mongoose/dao/course.js");
const Replacement = require("../mongoose/dao/replacement.js");
const Request = require("../mongoose/dao/request.js");
const Notification = require("../mongoose/dao/notification.js");
const Slot = require("../mongoose/dao/slot.js");
const LinkingSlot = require("../mongoose/dao/linkingSlot.js");

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
        let sat, sun, mon, tue, wed, thu;

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
        return res.send(200).json({ schedule: sch })
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
        let RepReqs;
        notifs.forEach(notif => {
            //if the notification is replacement and sent to the academic member
            if (notif.message.replacement && notif.message.receiverID === user.objectID) {
                //remove the unnecessary attributes 
                let { leave, dayOff, linkingSlot, ...RepReq } = notif.message;
                RepReqs.push(RepReq);
            }
        });
        //if there are slot linking notifications return them to the user
        if (RepReqs.length > 0)
            return res.status(200).json({ requests: RepReqs });
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
        const { repDate, slotRep } = req.body;



        if (!repDate)
            return res.status(400).json({ msg: "Please enter a date for replacement." });

        if (!slotRep)
            return res.status(400).json({ msg: "Please enter an array of staff IDs for replacement (in the same order of the slots to be covered)." });

        if (!(repDate instanceof Date))
            return res.status(400).json({ msg: "Please enter repDate as an instance of Date." });

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

        const slt = schedule.filter(slot => {
            slot.weekday === weekday;
        });

        //sort the slots
        let slots;
        let first, second, third, fourth, fifth;
        
        slt.forEach( s => 
            {
                switch(s.number)
                {
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
        
        if(first)
            slots.push(first);
        if(second)
            slots.push(second);
        if(third)
            slots.push(third);
        if(fourth)
            slots.push(fourth);
        if(fifth)
            slots.push(fifth);


        //if there are no slots => error message
        if (slots.length === 0)
            return res.status(400).json({ msg: "There are no slots to replace." });

        //if the length of slots !== length of slotRep => error message
        if (slots.length !== slotRep.length)
            return res.status(400).json({ msg: "Please enter the amount of staff ids equal to the number of non free slots on the replacement day." });


        //check if the courses of those slots could be covered by the staffIDs entered
        let repStaff;

        for (i = 0; i < slots.length; i++) {
            const staff = await Staff.findOne({ staffID: slotRep[i] });

            //if there is no staff with the staff id entered
            if(!staff)
                return res.status(404).json( { msg: "There is no staff with the id: " + slotRep[i] } );

            repStaff.push(staff);

            if (!(staff.courseIDs.includes(slots[i].course)))
                return res.status(400).json({ msg: "Staff " + slotRep[i] + " does not teach " + (await Course.findById(slots[i].course)).courseCode });
        }


        //send the request

        //A)create replacement requests
        let repReqs;

        for (i = 0; i < slots.length; i++) 
        {

            await Replacement.create({ replacementDay: repDate, replacementSlot: slots[i] }, (err, rep) => {
                if(err) throw err;

                repReqs.push(rep);

                });
        }

        //B)create requests for those replacement requests
        let reqs;

        for(i=0; i < repReqs.length; i++)
        {
            await Request.create( { senderID: user.objectID, receiverID: repStaff[i]._id, status: "Pending", replacement: repReqs[i], sentDate: Date.now() }, (err, rq) =>
            {
                if(err) throw err;

                reqs.push(rq);

            });
        }


        //C)create its notification and send to sender and receiver
       
        for(i=0; i < reqs.length; i++)
        {
            await Notification.create( { message: reqs[i], date: Date.now(), read: false }, (err, notif) =>
            {
                if(err) throw err;

                //add notification to sender
                sender.notifications.push(notif);
                await sender.save();
                //add notification to receiver
                repStaff[i].notifications.push(notif);
                await repStaff[i].save();


            });
        }
        
        return res.status(200).json( { msg: "Replacement requests sent." } );
        
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
        const slot = Slot.findById( slotID );

        if(!slot)
            return res.status(404).json( { msg: "There is no slot with the id entered." } );


        //if the slot is not within the courses taught by the sender
        const sender = await Staff.findById( user.objectID );

        if(!sender.courseIDs.includes(slot.course))
            return res.status(400).json( { msg: "The course of the slot requested is not within the courses assigned to the user." } );


        //if the slot is already taken by another staff

        const taken = await Staff.findOne( { role: { $ne: "HR"}, schedule: { slot: { _id: slotID } } } );

        if(taken)
            return res.status(500).json( { msg: "Anoter staff member was assigned to that slot." } );


        //if there are contradicting slots (either in schedule or sl request already sent)

        //in the schedule
        sender.forEach( schSlot => 
            {
                if(schSlot.weekday === slot.weekday && schSlot.number === slot.number)
                    return res.status(400).json( { msg: "There is already a slot assigned during the requested slot's time." } );
            });
        
        
        //in the sl requests sent
        sender.notifications.forEach( notif => 
            {
                if(notif.message.senderID === user.objectID && notif.message.linkingSlot && 
                    notif.message.linkingSlot.slot.weekday === slot.weekday && notif.message.linkingSlot.slot.number === slot.number)
                    return res.status(400).json( { msg: "There is a slot linking request sent for a slot during the requested slot's time." } );
            });

        

        //send the request
        
        
        const coordinatorID = await Course.findById(slot.course, { _id: 0, coordinatorID: 1 });
        
        //A) create an LS
        await LinkingSlot.create( { slot: slot }, (err, ls) =>
        {
            if(err) throw err;

            //B) create a req
            await Request.create( { senderID: user.objectID, receiverID: coordinatorID, status: "Pending",
                                    linkingSlot: ls, sentDate: Date.now() }, (err, rq) =>
                                    {
                                        if(err) throw err;

                                        //C) create notification and send to sender and receiver
                                        await Notification.create( { message: rq, date: Date.now(), read: false }, (err, notif) =>
                                        {
                                            if(err) throw err;

                                            //send notification to sender
                                            sender.notifications.push(notif);
                                            await sender.save();

                                            //send notification to coordinator
                                            await Staff.findByIdAndUpdate( coordinatorID, {
                                                $push: { notifications: notif }
                                            });
                                        });
                                    });
        });


        return res.status(200).json( { msg: "Slot linking request sent." } );
        
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

        //if no day off enterd
        //should be of the right format entered
        //if same day off of staff

        //TODO: check with group
        //if slot assigned on day off
        //LS req associated with requested day off
        
        return res.status(200).json( { msg: "Slot linking request sent." } );
        
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

        //gets the string denoting which weekday
        const { dayOff, reason } = req.body;

        //check if start date is yet to come
        //check if the number of working days missed can be subtracted from the leave balance
        //send a message requesting replacment for an array of working days missed
        
        return res.status(200).json( { msg: "Slot linking request sent." } );
        
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

        //gets the string denoting which weekday
        const { dayOff, reason } = req.body;

        //check if start date is yet to come
        //check if the number of working days missed can be subtracted from the leave balance
        //send a message requesting replacment for an array of working days missed
        
        return res.status(200).json( { msg: "Slot linking request sent." } );
        
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

        //gets the string denoting which weekday
        const { dayOff, reason } = req.body;

        //check if start date is yet to come
        //check if the number of working days missed can be subtracted from the leave balance
        //send a message requesting replacment for an array of working days missed
        
        return res.status(200).json( { msg: "Slot linking request sent." } );
        
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

        //gets the string denoting which weekday
        const { dayOff, reason } = req.body;

        //three months duration
        //add documents somehow

        //check if start date is yet to come
        //check if the number of working days missed can be subtracted from the leave balance
        //send a message requesting replacment for an array of working days missed
        
        return res.status(200).json( { msg: "Slot linking request sent." } );
        
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

        //gets the string denoting which weekday
        const { dayOff, reason } = req.body;

        //reason is mandatory here

        //check if start date is yet to come
        //check if the number of working days missed can be subtracted from the leave balance
        //send a message requesting replacment for an array of working days missed
        
        return res.status(200).json( { msg: "Slot linking request sent." } );
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
);



//-------------------------------------END OF ACADEMIC FUNCTIONALITIES---------------------------------------------

module.exports = router;
