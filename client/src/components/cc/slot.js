import React, { useState } from 'react';

var axios = require("axios");

const WEEKDAYS = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

const SLOTNUMS = ["First", "Second", "Third", "Fourth", "Fifth"];

function getSlots()
{
    let res = 
    { courseSlots:
        {
        sat: {first: [], second: [], third: [], fourth: [], fifth: []},
        sun: {first: [{objectID: "909090909", weekday: "Sunday", number: "First", location: "485730959438759483", course: "777", staffID: null}], second: [], third: [], fourth: [], fifth: []},
        mon: {first: [], second: [], third: [], fourth: [], fifth: [{objectID: "58947543984537", weekday: "Monday", number: "Fifth", location: "5487489473289473", course: "777", staffID: "ac-7"}]},
        tue: {first: [], second: [], third: [], fourth: [], fifth: []},
        wed: {first: [], second: [], third: [], fourth: [], fifth: []},
        thu: {first: [], second: [{objectID: "435843085749387549", weekday: "Thursday", number: "Second", location: "438547259437", course: "777", staffID: "ac-1"}], third: [], fourth: [], fifth: []}
        },
      course: "777"
    }
    return res;
}

const overlay = {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: "0",
    top: "0",
    background: "rgba(51,51,51,0.7)",
    "z-index": "10"
}

const card = {
    "max-width" : "600px",
    "width" : "50%",
    "max-height" : "600px"
}

function UpdateCard({slot, index, func})
{
    const [day, setDay] = useState(slot.weekday);
    const [number, setNumber] = useState(slot.number);
    const [location, setLocation] = useState(slot.location);

    const {setSelectedSlot, update} = func;

    const onClick = () => setSelectedSlot(false);

    const onChangeDay = (event) => setDay(event.target.value);
    const onChangeNum = (event) => setNumber(event.target.value);
    const onChangeLoc = (event) => setLocation(event.target.value);

    const onSubmit = () => 
    {
        if(day===slot.weekday && number === slot.number && location === slot.location)
            alert("No update to perform as parameters have not changed");
        else
        {
            update(slot, index, day, number, location);
            alert("Update successful");
            setSelectedSlot(false);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={overlay}>
            <div className="card text-white bg-primary mb-3 p-3" style={card}>
                <div className="d-flex justify-content-between">
                <h5 className="mb-5" style={{marginTop: "1%"}}>Update Slot</h5>
                <button className="btn pt-0" style={{height:"1.5rem"}} onClick={onClick}>X</button>
                </div>
                <form className="d-flex flex-column">
                <label>
                Weekday:
                <select className="ms-3" style={{width: "10rem"}} onChange={onChangeDay}>
                    {
                        WEEKDAYS.map( (day) =>  slot.weekday===day ? <option selected value={day}>{day}</option> : <option value={day}>{day}</option>)
                    }
                </select>
                </label>
                <label>
                Number:
                <select className="ms-3 mt-3" style={{width: "10rem"}} onChange={onChangeNum}>
                    {
                        SLOTNUMS.map( (num) =>  slot.number===num ? <option selected value={num}>{num}</option> : <option value={num}>{num}</option>)
                    }
                </select>
                </label>
                <label>
                Location:
                <input className="ms-3 mt-3" type="text" onChange={onChangeLoc}/>
                </label>
                </form>
                <div className="d-flex justify-content-center"><button type="submit" className="btn btn-warning mt-4" onClick={onSubmit}>Update</button></div>
            </div>
        </div>
    )
}

function DaySlotItem({slot, index, func})
{
    const {setSelectedSlot, setIndex, del} = func;

    const onUpdate = () => {

        setSelectedSlot(slot);

        setIndex(index);
    }

    const onDel = () =>  {
        del(slot, index);
    }

    return (
        <div className="card text-white bg-primary mb-3" id={slot.objectID} data-toggle="collapse" data-target={'#' + slot.objectID + "col"} aria-expanded="true" aria-controls={slot.objectID+"col"}>
                <div className="card-body">
                    <div className="d-flex justify-content-evenly mb-3">
                        <p className="d-inline">Weekday: {slot.weekday}</p>
                        <p className="d-inline ms-3">Number: {slot.number}</p>
                        <p className="d-inline ms-3">Location: {slot.location}</p>
                        <p className="d-inline ms-3">Course: {slot.course}</p>
                        <p className="d-inline ms-3">Staff: {slot.staffID ? slot.staffID : "none"}</p>
                    </div>
                    <div className="collapse" id={slot.objectID + "col"} aria-labelledby={slot.objectID}>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-warning" onClick={onUpdate}>Update</button>
                            <button className="btn btn-danger ms-3" onClick={onDel}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

function DaySlot({slots, func})
{
    return (
        <div className="card text-dark bg-light mb-3">
            <div className="mt-3 m-3">
            <h4>First</h4>
            {slots.first.length === 0 ? <p style={{textAlign:"center"}}>There are no slots</p> : slots.first.map( (slot, index) => <DaySlotItem slot={slot} index={index} func={func}/>)}
            </div>
            <div className="m-3">
            <h4>Second</h4>
            {slots.second.length === 0 ? <p style={{textAlign:"center"}}>There are no slots</p> : slots.second.map( (slot, index) => <DaySlotItem slot={slot} index={index} func={func}/>)}
            </div>
            <div className="m-3">
            <h4>Third</h4>
            {slots.third.length === 0 ? <p style={{textAlign:"center"}}>There are no slots</p> : slots.third.map( (slot, index) => <DaySlotItem slot={slot} index={index} func={func}/>)}
            </div>
            <div className="m-3">
            <h4>Fourth</h4>
            {slots.fourth.length === 0 ? <p style={{textAlign:"center"}}>There are no slots</p> : slots.fourth.map( (slot, index) => <DaySlotItem slot={slot} index={index} func={func}/>)}
            </div>
            <div className="m-3">
            <h4>Fifth</h4>
            {slots.fifth.length === 0 ? <p style={{textAlign:"center"}}>There are no slots</p> : slots.fifth.map( (slot, index) => <DaySlotItem slot={slot} index={index} func={func}/>)}
            </div>
        </div>
    )
}

function AddCard({func})
{
    const [day, setDay] = useState("Saturday");
    const [number, setNumber] = useState("First");
    const [location, setLocation] = useState();

    const {setAddSlot, addToTable} = func;

    const onClick = () => setAddSlot(false);

    const onChangeDay = (event) => setDay(event.target.value);
    const onChangeNum = (event) => setNumber(event.target.value);
    const onChangeLoc = (event) => setLocation(event.target.value);

    const onSubmit = () => 
    {
        if(!day || !number || !location)
            alert("Please fill all inputs");
        else
        {
            addToTable(day, number, location);
            alert("Add successful");
            setAddSlot(false);
        }

        
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={overlay}>
            <div className="card text-white bg-primary mb-3 p-3" style={card}>
                <div className="d-flex justify-content-between">
                <h5 className="mb-5" style={{marginTop: "1%"}}>Add Slot</h5>
                <button className="btn pt-0" style={{height:"1.5rem"}} onClick={onClick}>X</button>
                </div>
                <form className="d-flex flex-column">
                <label>
                Weekday:
                <select className="ms-3" style={{width: "10rem"}} onChange={onChangeDay}>
                    {
                        WEEKDAYS.map( (day) => <option value={day}>{day}</option>)
                    }
                </select>
                </label>
                <label>
                Number:
                <select className="ms-3 mt-3" style={{width: "10rem"}} onChange={onChangeNum}>
                    {
                        SLOTNUMS.map( (num) => <option value={num}>{num}</option>)
                    }
                </select>
                </label>
                <label>
                Location:
                <input className="ms-3 mt-3" type="text" onChange={onChangeLoc}/>
                </label>
                </form>
                <div className="d-flex justify-content-center"><button type="submit" className="btn btn-success mt-4" onClick={onSubmit}>Add</button></div>
            </div>
        </div>
    )
}

function Slot()
{
    /*
    const fetchSlots = async () =>{
        const URL = '/course-coordinator/get-slots';
        const result = await axios(URL, 
        {
          method: 'GET',
          headers: {
            "auth-token": localStorage.getItem("token")
          },
        });
        console.log("slots: " + JSON.stringify(result.data.courseSlots))
        return {...result.data.courseSlots};
    }
    */

    const {courseSlots, course} = getSlots();
    const [slots, setSlots] = useState(courseSlots);
    const [selectedSlot, setSelectedSlot] = useState();
    const [addSlot, setAddSlot] = useState(false);
    const [index, setIndex] = useState();

    console.log("result: " + slots);
    

    //TODO: zift mongoose
    const update = (slot, index, newWeekday, newNum, newLocation) => {
        
        del(slot, index);

        slot.weekday = newWeekday;
        slot.number = newNum;
        slot.location = newLocation;

        add(slot);
    }


    const addToTable = (weekday, number, location) => {

        let slot = {objectID: "dhfdjkaskdhsfkdsahjfdsklj", weekday: weekday, number: number, location: location, course: course._id, staffID: null};

        add(slot);
    }

    const add = (slot) => {
        if(slot.weekday === "Saturday")
        {
            if(slot.number === "First")
            {
                slots.sat.first.push(slot);
            }
            else if(slot.number === "Second")
            {
                slots.sat.second.push(slot);
            }
            else if(slot.number === "Third")
            {
                slots.sat.third.push(slot);
            }
            else if(slot.number === "Fourth")
            {
                slots.sat.fourth.push(slot);
            }
            else if(slot.number === "Fifth")
            {
                slots.sat.fifth.push(slot);
            }
        }
        else if(slot.weekday === "Sunday")
        {
            if(slot.number === "First")
            {
                slots.sun.first.push(slot);
            }
            else if(slot.number === "Second")
            {
                slots.sun.second.push(slot);
            }
            else if(slot.number === "Third")
            {
                slots.sun.third.push(slot);
            }
            else if(slot.number === "Fourth")
            {
                slots.sun.fourth.push(slot);
            }
            else if(slot.number === "Fifth")
            {
                slots.sun.fifth.push(slot);
            }
        }
        else if(slot.weekday === "Monday")
        {
            if(slot.number === "First")
            {
                slots.mon.first.push(slot);
            }
            else if(slot.number === "Second")
            {
                slots.mon.second.push(slot);
            }
            else if(slot.number === "Third")
            {
                slots.mon.third.push(slot);
            }
            else if(slot.number === "Fourth")
            {
                slots.mon.fourth.push(slot);
            }
            else if(slot.number === "Fifth")
            {
                slots.mon.fifth.push(slot);
            }
        }
        else if(slot.weekday === "Tuesday")
        {
            if(slot.number === "First")
            {
                slots.tue.first.push(slot);
            }
            else if(slot.number === "Second")
            {
                slots.tue.second.push(slot);
            }
            else if(slot.number === "Third")
            {
                slots.tue.third.push(slot);
            }
            else if(slot.number === "Fourth")
            {
                slots.tue.fourth.push(slot);
            }
            else if(slot.number === "Fifth")
            {
                slots.tue.fifth.push(slot);
            }
        }
        else if(slot.weekday === "Wednesday")
        {
            if(slot.number === "First")
            {
                slots.wed.first.push(slot);
            }
            else if(slot.number === "Second")
            {
                slots.wed.second.push(slot);
            }
            else if(slot.number === "Third")
            {
                slots.wed.third.push(slot);
            }
            else if(slot.number === "Fourth")
            {
                slots.wed.fourth.push(slot);
            }
            else if(slot.number === "Fifth")
            {
                slots.wed.fifth.push(slot);
            }
        }
        else if(slot.weekday === "Thursday")
        {
            if(slot.number === "First")
            {
                slots.thu.first.push(slot);
            }
            else if(slot.number === "Second")
            {
                slots.thu.second.push(slot);
            }
            else if(slot.number === "Third")
            {
                slots.thu.third.push(slot);
            }
            else if(slot.number === "Fourth")
            {
                slots.thu.fourth.push(slot);
            }
            else if(slot.number === "Fifth")
            {
                slots.thu.fifth.push(slot);
            }
        }

        setSlots({...slots});
    }

    const del = (slot, index) => {

        if(slot.weekday === "Saturday")
        {
            if(slot.number === "First")
            {
                slots.sat.first.splice(index,1);
            }
            else if(slot.number === "Second")
            {
                slots.sat.second.splice(index,1);
            }
            else if(slot.number === "Third")
            {
                slots.sat.third.splice(index,1);
            }
            else if(slot.number === "Fourth")
            {
                slots.sat.fourth.splice(index,1);
            }
            else if(slot.number === "Fifth")
            {
                slots.sat.fifth.splice(index,1);
            }
        }
        else if(slot.weekday === "Sunday")
        {
            if(slot.number === "First")
            {
                slots.sun.first.splice(index,1);
            }
            else if(slot.number === "Second")
            {
                slots.sun.second.splice(index,1);
            }
            else if(slot.number === "Third")
            {
                slots.sun.third.splice(index,1);
            }
            else if(slot.number === "Fourth")
            {
                slots.sun.fourth.splice(index,1);
            }
            else if(slot.number === "Fifth")
            {
                slots.sun.fifth.splice(index,1);
            }
        }
        else if(slot.weekday === "Monday")
        {
            if(slot.number === "First")
            {
                slots.mon.first.splice(index,1);
            }
            else if(slot.number === "Second")
            {
                slots.mon.second.splice(index,1);
            }
            else if(slot.number === "Third")
            {
                slots.mon.third.splice(index,1);
            }
            else if(slot.number === "Fourth")
            {
                slots.mon.fourth.splice(index,1);
            }
            else if(slot.number === "Fifth")
            {
                slots.mon.fifth.splice(index,1);
            }
        }
        else if(slot.weekday === "Tuesday")
        {
            if(slot.number === "First")
            {
                slots.tue.first.splice(index,1);
            }
            else if(slot.number === "Second")
            {
                slots.tue.second.splice(index,1);
            }
            else if(slot.number === "Third")
            {
                slots.tue.third.splice(index,1);
            }
            else if(slot.number === "Fourth")
            {
                slots.tue.fourth.splice(index,1);
            }
            else if(slot.number === "Fifth")
            {
                slots.tue.fifth.splice(index,1);
            }
        }
        else if(slot.weekday === "Wednesday")
        {
            if(slot.number === "First")
            {
                slots.wed.first.splice(index,1);
            }
            else if(slot.number === "Second")
            {
                slots.wed.second.splice(index,1);
            }
            else if(slot.number === "Third")
            {
                slots.wed.third.splice(index,1);
            }
            else if(slot.number === "Fourth")
            {
                slots.wed.fourth.splice(index,1);
            }
            else if(slot.number === "Fifth")
            {
                slots.wed.fifth.splice(index,1);
            }
        }
        else if(slot.weekday === "Thursday")
        {
            if(slot.number === "First")
            {
                slots.thu.first.splice(index,1);
            }
            else if(slot.number === "Second")
            {
                slots.thu.second.splice(index,1);
            }
            else if(slot.number === "Third")
            {
                slots.thu.third.splice(index,1);
            }
            else if(slot.number === "Fourth")
            {
                slots.thu.fourth.splice(index,1);
            }
            else if(slot.number === "Fifth")
            {
                slots.thu.fifth.splice(index,1);
            }
        }
        
        setSlots({...slots});
    }

    const func = {
        update: update,
        del: del,
        addToTable: addToTable,
        setSelectedSlot : setSelectedSlot,
        setIndex: setIndex,
        setAddSlot: setAddSlot
    }

    const onAdd = () => setAddSlot(true);

    return (
        <div>
        <div className="d-flex justify-content-center m-5"><button className="btn btn-success" onClick={onAdd}>Add Slot</button></div>
        <div className="my-5 mx-5">
        <table className="table table-hover table-responsive-lg">
            <thead className="table-light">
                <tr>
                <th scope="col">Weekday</th>
                <th scope="col" style={{"text-align":"center"}}>First</th>
                <th scope="col" style={{"text-align":"center"}}>Second</th>
                <th scope="col" style={{"text-align":"center"}}>Third</th>
                <th scope="col" style={{"text-align":"center"}}>Fourth</th>
                <th scope="col" style={{"text-align":"center"}}>Fifth</th>
                </tr>
            </thead>
            <tbody>
                <tr id="sat" data-toggle="collapse" data-target="#satSlots" aria-expanded="true" aria-controls="satSlots">
                <th scope="row">Saturday</th>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sat.first.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sat.second.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sat.third.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sat.fourth.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sat.fifth.length}</span></div></td>
                </tr>
                <tr id="satSlots" className="collapse" aria-labelledby="sat"><td colSpan="6"><DaySlot slots={slots.sat} func={func}/></td></tr>
                <tr id="sun" data-toggle="collapse" data-target="#sunSlots" aria-expanded="true" aria-controls="sunSlots">
                <th scope="row">Sunday</th>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sun.first.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sun.second.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sun.third.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sun.fourth.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.sun.fifth.length}</span></div></td>
                </tr>
                <tr id="sunSlots" className="collapse" aria-labelledby="sun"><td colSpan="6"><DaySlot slots={slots.sun} func={func}/></td></tr>
                <tr id="mon" data-toggle="collapse" data-target="#monSlots" aria-expanded="true" aria-controls="monSlots">
                <th scope="row">Monday</th>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.mon.first.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.mon.second.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.mon.third.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.mon.fourth.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.mon.fifth.length}</span></div></td>
                </tr>
                <tr id="monSlots" className="collapse" aria-labelledby="mon"><td colSpan="6"><DaySlot slots={slots.mon} func={func}/></td></tr>
                <tr id="tue" data-toggle="collapse" data-target="#tueSlots" aria-expanded="true" aria-controls="tueSlots">
                <th scope="row">Tuesday</th>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.tue.first.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.tue.second.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.tue.third.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.tue.fourth.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.tue.fifth.length}</span></div></td>
                </tr>
                <tr id="tueSlots" className="collapse" aria-labelledby="tue"><td colSpan="6"><DaySlot slots={slots.tue} func={func}/></td></tr>
                <tr id="wed" data-toggle="collapse" data-target="#wedSlots" aria-expanded="true" aria-controls="wedSlots">
                <th scope="row">Wednesday</th>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.wed.first.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.wed.second.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.wed.third.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.wed.fourth.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.wed.fifth.length}</span></div></td>
                </tr>
                <tr id="wedSlots" className="collapse" aria-labelledby="wed"><td colSpan="6"><DaySlot slots={slots.wed} func={func}/></td></tr>
                <tr id="thu" data-toggle="collapse" data-target="#thuSlots" aria-expanded="true" aria-controls="thuSlots">
                <th scope="row">Thursday</th>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.thu.first.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.thu.second.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.thu.third.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.thu.fourth.length}</span></div></td>
                <td><div className="d-flex justify-content-center"><span className="badge rounded-pill bg-primary">{slots.thu.fifth.length}</span></div></td>
                </tr>
                <tr id="thuSlots" className="collapse" aria-labelledby="thu"><td colSpan="6"><DaySlot slots={slots.thu} func={func}/></td></tr>
            </tbody>
        </table>
        </div>
        {selectedSlot ? <UpdateCard slot={selectedSlot} index={index} func={func}/> : null}
        {addSlot ? <AddCard func={func}/> : null }
        </div>
    )

}

export default Slot;