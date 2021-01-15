export function parseSchedule(schedule) {
  try {
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
        } else if (slot.number === "Second") {
          sat.second = slot;
        } else if (slot.number === "Third") {
          sat.third = slot;
        } else if (slot.number === "Fourth") {
          sat.fourth = slot;
        } else if (slot.number === "Fifth") {
          sat.fifth = slot;
        }
      } else if (slot.weekday === "Sunday") {
        if (slot.number === "First") {
          sun.first = slot;
        } else if (slot.number === "Second") {
          sun.second = slot;
        } else if (slot.number === "Third") {
          sun.third = slot;
        } else if (slot.number === "Fourth") {
          sun.fourth = slot;
        } else if (slot.number === "Fifth") {
          sun.fifth = slot;
        }
      } else if (slot.weekday === "Monday") {
        if (slot.number === "First") {
          mon.first = slot;
        } else if (slot.number === "Second") {
          mon.second = slot;
        } else if (slot.number === "Third") {
          mon.third = slot;
        } else if (slot.number === "Fourth") {
          mon.fourth = slot;
        } else if (slot.number === "Fifth") {
          mon.fifth = slot;
        }
      } else if (slot.weekday === "Tuesday") {
        if (slot.number === "First") {
          tue.first = slot;
        } else if (slot.number === "Second") {
          tue.second = slot;
        } else if (slot.number === "Third") {
          tue.third = slot;
        } else if (slot.number === "Fourth") {
          tue.fourth = slot;
        } else if (slot.number === "Fifth") {
          tue.fifth = slot;
        }
      } else if (slot.weekday === "Wednesday") {
        if (slot.number === "First") {
          wed.first = slot;
        } else if (slot.number === "Second") {
          wed.second = slot;
        } else if (slot.number === "Third") {
          wed.third = slot;
        } else if (slot.number === "Fourth") {
          wed.fourth = slot;
        } else if (slot.number === "Fifth") {
          wed.fifth = slot;
        }
      } else if (slot.weekday === "Thursday") {
        if (slot.number === "First") {
          thu.first = slot;
        } else if (slot.number === "Second") {
          thu.second = slot;
        } else if (slot.number === "Third") {
          thu.third = slot;
        } else if (slot.number === "Fourth") {
          thu.fourth = slot;
        } else if (slot.number === "Fifth") {
          thu.fifth = slot;
        }
      }
    });

    //fill empty slots
    if (!sat.first) sat.first = "Free";
    if (!sat.second) sat.second = "Free";
    if (!sat.third) sat.third = "Free";
    if (!sat.fourth) sat.fourth = "Free";
    if (!sat.fifth) sat.fifth = "Free";

    if (!sun.first) sun.first = "Free";
    if (!sun.second) sun.second = "Free";
    if (!sun.third) sun.third = "Free";
    if (!sun.fourth) sun.fourth = "Free";
    if (!sun.fifth) sun.fifth = "Free";

    if (!mon.first) mon.first = "Free";
    if (!mon.second) mon.second = "Free";
    if (!mon.third) mon.third = "Free";
    if (!mon.fourth) mon.fourth = "Free";
    if (!mon.fifth) mon.fifth = "Free";

    if (!tue.first) tue.first = "Free";
    if (!tue.second) tue.second = "Free";
    if (!tue.third) tue.third = "Free";
    if (!tue.fourth) tue.fourth = "Free";
    if (!tue.fifth) tue.fifth = "Free";

    if (!wed.first) wed.first = "Free";
    if (!wed.second) wed.second = "Free";
    if (!wed.third) wed.third = "Free";
    if (!wed.fourth) wed.fourth = "Free";
    if (!wed.fifth) wed.fifth = "Free";

    if (!thu.first) thu.first = "Free";
    if (!thu.second) thu.second = "Free";
    if (!thu.third) thu.third = "Free";
    if (!thu.fourth) thu.fourth = "Free";
    if (!thu.fifth) thu.fifth = "Free";

    //add the days together into one object as the  whole schedule
    const sch = { sat: sat, sun: sun, mon: mon, tue: tue, wed: wed, thu: thu };
    //return the schedule
    return sch;
  } catch (error) {
    throw Error(error.message);
  }
}
