import React, { Component, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import getHistory from "../index";
import { Router, Route, Redirect } from "react-router-dom";

import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import { parseSchedule } from "../util/parseSchedule";
import Schedule from "./schedule";

export class ViewProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = { radio: "", schedule: null };
    this.handleSchedule = this.handleSchedule.bind(this);
  }
  onChange(value, index) {
    //  console.log(value, index);
  }
  setValue(event) {
    this.setState({ radio: event.target.value });
  }
  handleSchedule(scheduleProp) {
    this.setState({
      schedule: scheduleProp,
    });
  }

  render() {
    if (this.state.schedule != null) {
      return (
        <Redirect
          to={{
            pathname: "/schedule",
            state: this.state.schedule,
          }}
        />
      );
    }

    /*   const data = [
      { id: 1, name: "Gob", value: "2" },
      {
        id: (
          <div onChange={this.setGender.bind(this)}>
            <input type="radio" value="MALE" name="gender" /> Male
          </div>
        ),
        name: "Buster",
        value: "5",
      },
      {
        id: (
          <div onChange={this.setGender.bind(this)}>
            <input type="radio" value="F" name="gender" /> F
          </div>
        ),
        name: "George Michael",
        value: "4",
      },
    ]; */
    const columns = [
      {
        dataField: "staffID",
        text: "Staff Id",
      },
      {
        dataField: "name",
        text: "Name",
      },
      {
        dataField: "gender",
        text: "Gender",
      },

      {
        dataField: "role",
        text: "Role",
      },
      {
        dataField: "email",
        text: "Email",
      },
      {
        dataField: "dayOff",
        text: "Day-off",
      },
      {
        dataField: "leaveBalance",
        text: "Leave Balance",
      },
      {
        dataField: "accidentDays",
        text: "Accident Days",
      },
      {
        dataField: "salaryDeduction",
        text: "Salary Deduction",
      },

      {
        dataField: "salary",
        text: "Salary",
      },
      {
        dataField: "facultyID",
        text: "Faculty",
      },
      {
        dataField: "departmentID",
        text: "Department",
      },
      {
        dataField: "others",
        text: "Others",
      },
      {
        dataField: "courseIDs",
        text: "Courses Ids",
      },

      /*     {
        dataField: "attendance",
        text: "Attendance",
      }, */
      {
        dataField: "schedule",
        text: "Schedule",
      },
    ];
    let data = [];

    this.props.staff.staff.map((el) => {
      let id = (
        <div onChange={this.setValue.bind(this)}>
          <input type="radio" value={el.staffID} name="staffID" />
          {el.staffID}
        </div>
      );
      let courses = el.courseIDs.map((course) => {
        return <div>{`"` + course + `"`}</div>;
      });

      let schedule = el.schedule;
      schedule = parseSchedule(schedule);
      let schedule2 = (
        <a class="btn btn-info" onClick={() => this.handleSchedule(schedule)}>
          Info
        </a>
      );

      data.push({
        ...el,
        staffID: id,
        schedule: schedule2,
        courseIDs: courses,
      });
    });
    return (
      <div className="App">
        <p className="Table-header">Staff Profile</p>

        <BootstrapTable keyField="id" data={data} columns={columns} />
      </div>
    );
    /*  return (
      <div>
        <h1>12</h1>
      </div>
    ); */
  }
}

export default ViewProfiles;
