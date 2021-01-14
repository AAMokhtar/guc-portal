import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";

export class ViewProfiles extends Component {
  state = {};
  onChange(value, index) {
    //  console.log(value, index);
  }
  setValue(event) {
    this.setState({ radio: event.target.value });
    console.log(this.state);
  }

  render() {
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
      /*   {
        dataField: "courseIDs",
        text: "Courses Ids",
      }, */

      /*     {
        dataField: "attendance",
        text: "Attendance",
      }, */
      /*       {
        dataField: "schedule",
        text: "Schedule",
      }, */
    ];
    let data = [];
    console.log(this.props.staff.staff);

    this.props.staff.staff.map((el) => {
      console.log(el);
      let id = (
        <div onChange={this.setValue.bind(this)}>
          <input type="radio" value={el.staffID} name="staffID" />
          {el.staffID}
        </div>
      );
      data.push({
        ...el,
        staffID: id,
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
