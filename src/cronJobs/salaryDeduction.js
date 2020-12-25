module.exports = async function(){
    const cursor = Staff.find().cursor();

    for (let user = await cursor.next(); user != null; user = await cursor.next()) {
        var missingDayHour = await missingDayHours(user);
        var deduction = missingDayHour.days * (user.salary / 60);

        //don't count the first 02:59
        missingDayHour.hours = math.max(0, missingDayHour.hours - 2.983);

        const hours = Math.floor(missingDayHour.hours);
        const minutes = (missingDayHour.hours - hours) * 60;

        deduction += (hours * (salary / 180)) + (minutes * (salary / 180 * 60));

        user.salaryDeduction = deduction;

        //save document
        await user.save();
    }

    console.log(blue("previous month's salary deduction calculated!"));

}


async function missingDayHours(user){

    if(!user){
        return {};
    }
    
    //user's day off
    var dayOff = dayToInt(user.dayOff);
  
    //today in utc
    const curDate = new Date();
    curDate.setUTCHours(0,0,0,0);
  
    var startDate;
  
    //start date in previous month
    if(curDate.getDate() < 11){
  
        var year = curDate.getFullYear();
        var month = curDate.getMonth() - 1;
  
        if(month < 0){
            month = 11;
            year--;
        }
  
        //11th of the previous month
        startDate = new Date(Date.UTC(year, month, 11, 0, 0, 0, 0));
    }
    //start date in current month
    else{
  
        var year = curDate.getFullYear();
        var month = curDate.getMonth() + 1;
  
        if(month > 11){
            month = 0;
            year++;
        }
  
        //11th of the previous month
        startDate = new Date(Date.UTC(curDate.getFullYear(), curDate.getMonth(), 11, 0, 0, 0, 0));
    }
  
    //filter the attendance to reduce the array as much as possible
    var missingDaysP1 = user.attendance.filter(elem => 
        elem.date >= startDate 
        && elem.date <= curDate
        && elem.date.getDay() != 5
        && elem.date.getDay() != dayOff);
  
    //apply the expensive leave request filter on the reduced array
    var missingDayHour = [];
  
    for (const day of missingDaysP1){
        const off = await acceptedLeaveOnDate(user._id, day.date);
        if(!off){
          missingDayHour.push(day);
        }
    }
  
    //missing days
    var missingDayHourP1 = missingDayHour.filter(elem => 
      elem.signIn.length == 0 || elem.signOut.length == 0);
  
    var missingDayHourP2 = missingDayHour.filter(elem => 
      elem.signIn.length != 0 || elem.signOut.length != 0);
  
    var totalMissingHours = 0;
    missingDayHourP2.forEach(attDay => {
      var workedms = 0.0;
  
  
      //at 07:00AM
      var dayStart = new Date(Date.UTC(
          attDay.date.getFullYear(), 
          attDay.date.getMonth(), 
          attDay.date.getDate(), 7, 0, 0, 0));
              
      //at 07:00PM
      var dayEnd = new Date(Date.UTC(
          attDay.date.getFullYear(), 
          attDay.date.getMonth(), 
          attDay.date.getDate(), 19, 0, 0, 0));
  
      attDay.signIn.forEach((elem, indx) => {
          //sign in without a sign out
          if(indx >=  attDay.signOut.length)
              return;
  
          //calculate the amount of milliseconds worked from 7AM to 7PM
          workedms += Math.min(dayEnd.getTime(), attDay.signOut[indx].getTime())
          - Math.max(dayStart.getTime(), elem.getTime());
      });
  
      //calculate the missing hours that day (required hours - worked hours)
      var missingHours = Math.max(8.4 - workedms / (1000 * 60  * 60), 0);
      //accumulate missing hours
      totalMissingHours += missingHours;
    });
  
    //return the missing days so far
    return {days: missingDayHourP1.length, hours: totalMissingHours};
  }

  async function acceptedLeaveOnDate(sender ,date){

    //all accepted leave requests for the user that enclose the parameter date
    var requests = await Request.find({
        senderID: sender,
        status: 'Accepted',
        leave: {$exists: true},
        'leave.startDate': {$lte: date},
        'leave.endDate': {$gte: date}
    });
  
    return requests.length > 0;
  }
  
  function dayToInt(day){
    switch(day) {
        case 'Sunday':
            return 0;
        case 'Monday':
            return 1;
        case 'Tuesday':
            return 2;
        case 'Wednesday':
            return 3;
        case 'Thursday':
            return 4;
        case 'Saturday':
            return 6;
        default:
            return 5;
    };
  }