import React, { useState, useEffect } from 'react';


function getSchedule()
{
    let res = { "schedule": { sat: { first: 'Free', second: 'Free', third: 'Free', fourth: 'Free', fifth: 'Free' }, sun: { second: { staffID: 'ac-10', _id: "5fe60e3702de9f499caaccc5", weekday: 'Sunday', number: 'Second', location: "5fe5fda33397bb4859bedce2", course: "5fe5e2d23397bb4859bedcde" }, first: { staffID: 'ac-10', _id: "5fe60e3702de9f499caaccc5", weekday: 'Sunday', number: 'Second', location: "5fe5fda33397bb4859bedce2", course: "5fe5e2d23397bb4859bedcde" }, third: { staffID: 'ac-10', _id: "5fe60e3702de9f499caaccc5", weekday: 'Sunday', number: 'Second', location: "5fe5fda33397bb4859bedce2", course: "5fe5e2d23397bb4859bedcde" }, fourth: { staffID: 'ac-10', _id: "5fe60e3702de9f499caaccc5", weekday: 'Sunday', number: 'Second', location: "5fe5fda33397bb4859bedce2", course: "5fe5e2d23397bb4859bedcde" }, fifth: { staffID: 'ac-10', _id: "5fe60e3702de9f499caaccc5", weekday: 'Sunday', number: 'Second', location: "5fe5fda33397bb4859bedce2", course: "5fe5e2d23397bb4859bedcde" } }, mon: { first: 'Free', second: 'Free', third: 'Free', fourth: 'Free', fifth: 'Free' }, tue: { first: 'Free', second: 'Free', third: 'Free', fourth: 'Free', fifth: 'Free' }, wed: { second: { staffID: 'ac-10', _id: "5fe5e7b93397bb4859bedcdf", weekday: 'Wednesday', number: 'Second', location: "5fe5e72d1a8106b169946528", course: "5fe5e2d23397bb4859bedcde" }, first: 'Free', third: 'Free', fourth: 'Free', fifth: 'Free' }, thu: { first: 'Free', second: 'Free', third: 'Free', fourth: 'Free', fifth: 'Free' } } }

    return res.schedule;
}

function SchTable()
{
    const slots = getSchedule();

    return (
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
                <td><div className="d-flex justify-content-center">
                    { (slots.sat.first.course) ?
                        <div> 
                        <p>Course: {slots.sat.first.course}</p>
                        <p>Location: {slots.sat.first.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.sat.second.course) ?
                        <div> 
                        <p>Course: {slots.sat.second.course}</p>
                        <p>Location: {slots.sat.second.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.sat.third.course) ?
                        <div> 
                        <p>Course: {slots.sat.third.course}</p>
                        <p>Location: {slots.sat.third.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.sat.fourth.course) ?
                        <div> 
                        <p>Course: {slots.sat.fourth.course}</p>
                        <p>Location: {slots.sat.fourth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.sat.fifth.course) ?
                        <div> 
                        <p>Course: {slots.sat.fifth.course}</p>
                        <p>Location: {slots.sat.fifth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                </tr>
                <tr id="sun" data-toggle="collapse" data-target="#sunSlots" aria-expanded="true" aria-controls="sunSlots">
                <th scope="row">Sunday</th>
                <td><div className="d-flex justify-content-center">
                    { (slots.sun.first.course) ?
                        <div> 
                        <p>Course: {slots.sun.first.course}</p>
                        <p>Location: {slots.sun.first.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.sun.second.course) ?
                        <div> 
                        <p>Course: {slots.sun.second.course}</p>
                        <p>Location: {slots.sun.second.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.sun.third.course) ?
                        <div> 
                        <p>Course: {slots.sun.third.course}</p>
                        <p>Location: {slots.sun.third.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.sun.fourth.course) ?
                        <div> 
                        <p>Course: {slots.sun.fourth.course}</p>
                        <p>Location: {slots.sun.fourth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.sun.fifth.course) ?
                        <div> 
                        <p>Course: {slots.sun.fifth.course}</p>
                        <p>Location: {slots.sun.fifth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                </tr>
                <tr id="mon" data-toggle="collapse" data-target="#monSlots" aria-expanded="true" aria-controls="monSlots">
                <th scope="row">Monday</th>
                <td><div className="d-flex justify-content-center">
                    { (slots.mon.first.course) ?
                        <div> 
                        <p>Course: {slots.mon.first.course}</p>
                        <p>Location: {slots.mon.first.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.mon.second.course) ?
                        <div> 
                        <p>Course: {slots.mon.second.course}</p>
                        <p>Location: {slots.mon.second.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.mon.third.course) ?
                        <div> 
                        <p>Course: {slots.mon.third.course}</p>
                        <p>Location: {slots.mon.third.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.mon.fourth.course) ?
                        <div> 
                        <p>Course: {slots.mon.fourth.course}</p>
                        <p>Location: {slots.mon.fourth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.mon.fifth.course) ?
                        <div> 
                        <p>Course: {slots.mon.fifth.course}</p>
                        <p>Location: {slots.mon.fifth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                </tr>
                <tr id="tue" data-toggle="collapse" data-target="#tueSlots" aria-expanded="true" aria-controls="tueSlots">
                <th scope="row">Tuesday</th>
                <td><div className="d-flex justify-content-center">
                    { (slots.tue.first.course) ?
                        <div> 
                        <p>Course: {slots.tue.first.course}</p>
                        <p>Location: {slots.tue.first.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.tue.second.course) ?
                        <div> 
                        <p>Course: {slots.tue.second.course}</p>
                        <p>Location: {slots.tue.second.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.tue.third.course) ?
                        <div> 
                        <p>Course: {slots.tue.third.course}</p>
                        <p>Location: {slots.tue.third.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.tue.fourth.course) ?
                        <div> 
                        <p>Course: {slots.tue.fourth.course}</p>
                        <p>Location: {slots.tue.fourth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.tue.fifth.course) ?
                        <div> 
                        <p>Course: {slots.tue.fifth.course}</p>
                        <p>Location: {slots.tue.fifth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                </tr>
                <tr id="wed" data-toggle="collapse" data-target="#wedSlots" aria-expanded="true" aria-controls="wedSlots">
                <th scope="row">Wednesday</th>
                <td><div className="d-flex justify-content-center">
                    { (slots.wed.first.course) ?
                        <div> 
                        <p>Course: {slots.wed.first.course}</p>
                        <p>Location: {slots.wed.first.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.wed.second.course) ?
                        <div> 
                        <p>Course: {slots.wed.second.course}</p>
                        <p>Location: {slots.wed.second.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.wed.third.course) ?
                        <div> 
                        <p>Course: {slots.wed.third.course}</p>
                        <p>Location: {slots.wed.third.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.wed.fourth.course) ?
                        <div> 
                        <p>Course: {slots.wed.fourth.course}</p>
                        <p>Location: {slots.wed.fourth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.wed.fifth.course) ?
                        <div> 
                        <p>Course: {slots.wed.fifth.course}</p>
                        <p>Location: {slots.wed.fifth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                </tr>
                <tr id="thu" data-toggle="collapse" data-target="#thuSlots" aria-expanded="true" aria-controls="thuSlots">
                <th scope="row">Thursday</th>
                <td><div className="d-flex justify-content-center">
                    { (slots.thu.first.course) ?
                        <div> 
                        <p>Course: {slots.thu.first.course}</p>
                        <p>Location: {slots.thu.first.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.thu.second.course) ?
                        <div> 
                        <p>Course: {slots.thu.second.course}</p>
                        <p>Location: {slots.thu.second.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.thu.third.course) ?
                        <div> 
                        <p>Course: {slots.thu.third.course}</p>
                        <p>Location: {slots.thu.third.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.thu.fourth.course) ?
                        <div> 
                        <p>Course: {slots.thu.fourth.course}</p>
                        <p>Location: {slots.thu.fourth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                <td><div className="d-flex justify-content-center">
                    { (slots.thu.fifth.course) ?
                        <div> 
                        <p>Course: {slots.thu.fifth.course}</p>
                        <p>Location: {slots.thu.fifth.location}</p>
                        </div> :
                        <p>Free</p>
                    }
                    </div>
                </td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

function SendReplacement()
{
    return (
        <div>
            <h5>Choose a slot</h5>
            <SchTable />
        </div>
    )
}

export default SendReplacement;