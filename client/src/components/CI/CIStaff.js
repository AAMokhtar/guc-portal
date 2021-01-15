import React, { Component, createRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";

import {
  Container,
  Jumbotron,
  Button,
  Table,
  Col,
  Form,
  Modal,
  Tooltip,
} from "react-bootstrap";
import Overlay from "react-bootstrap/Overlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ViewProfiles from "../../views/viewStaffProfiles";
import Schedule from "../../views/schedule";
import { parseSchedule } from "../../util/parseSchedule";
let token = localStorage.getItem("token");
var axios = require("axios");

export class CIStaff extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
    this.handleUpdateSlot = this.handleUpdateSlot.bind(this);
    this.handleAssignSlot = this.handleAssignSlot.bind(this);
    this.handleDeleteSlot = this.handleDeleteSlot.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      staff: [],
      radio: [],
      show: false,
      result: [],
      schedule: [],
      assign: null,
      //assign - delete
      assignSlotCourse: null,
      assignLocation: null,
      assignNumber: null,
      assignWeekDay: null,
      //
      updateSlotCourseBefore: null,
      updateLocationBefore: null,
      updateNumberBefore: null,
      updateWeekDayBefore: null,
      // update
      updateSlotCourseAfter: null,
      updateLocationAfter: null,
      updateNumberAfter: null,
      updateWeekDayAfter: null,
      //
      courseCodeBefore: null,
      courseCode: null,
      courseCodeAfter: null,
      delete: null,
      courseFilter: null,
      initial: "Show coverage",
      data: [],
      locations: [],
      number: ["First", "Second", "Third", "Fourth", "Fifth"],
      weekday: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      columns: [
        {
          dataField: "courseCode",
          text: "Course Code",
        },
        {
          dataField: "coverage",
          text: "Coverage",
        },
      ],
      assignments: [],
    };

    this.Result = createRef();
  }
  courseChooseHandler(event) {
    this.setState({ assignSlotCourse: event.target.value });
  }
  setValue(event) {
    this.setState({ assign: event.target.value });
  }
  deleteValue(event) {
    this.setState({ delete: event.target.value });
    console.log(this.state);
  }
  setBeforeCode(event) {
    this.setState({ courseCodeBefore: event.target.value });
    //console.log(event.target.value);
    console.log(this.state);
  }
  setAfterCode(event) {
    this.setState({ courseCodeAfter: event.target.value });
    console.log(this.state);
  }
  async componentWillMount() {
    var config = {
      method: "get",
      url:
        "http://localhost:4000/ci/viewStaff" +
        (this.state.courseFilter
          ? "?courseCode=" + this.state.courseFilter
          : ""),
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEzOTY0NjI3fQ.bKaLJoATEKC6KLgydvBDYPPqt0VmqnKjFAE-oGxyL1o",
      },
    };
    var config2 = {
      method: "get",
      url: "http://localhost:4000/ci/getCourses",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEzOTY0NjI3fQ.bKaLJoATEKC6KLgydvBDYPPqt0VmqnKjFAE-oGxyL1o",
      },
    };

    var configCoverage = {
      method: "get",
      url: "http://localhost:4000/ci/viewCoverage",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEzOTY0NjI3fQ.bKaLJoATEKC6KLgydvBDYPPqt0VmqnKjFAE-oGxyL1o",
      },
    };
    var configLocations = {
      method: "get",
      url: "http://localhost:4000/general/getLocations",
      headers: {},
    };

    let [
      Response,
      result2,
      coverageResult,
      locationResult,
    ] = await Promise.all([
      axios(config),
      axios(config2),
      axios(configCoverage),
      axios(configLocations),
    ]);

    let data = coverageResult.data.result;
    console.log(data);
    let radio = Array(Response.data.result.length).fill(false);
    let result = [
      <option value="" selected disabled>
        Please select
      </option>,
    ];
    result.push(
      result2.data.result.map((el) => {
        return <option value={el}>{el}</option>;
      })
    );

    let scheduleResult = [];

    Response.data.result.map((el) => {
      let schedule = el.schedule;
      schedule = parseSchedule(schedule);

      let temp = (
        <Schedule staff={{ schedule, text: "Schedule: " + el.staffID }} />
      );
      scheduleResult.push(temp);
    });

    // locations
    let locResult = [
      <option value="" selected disabled>
        Please select
      </option>,
    ];
    locResult.push(
      locationResult.data.result.map((el) => {
        return <option value={el}>{el}</option>;
      })
    );

    let WeekResult = [
      <option value="" selected disabled>
        Please select
      </option>,
    ];
    WeekResult.push(
      this.state.weekday.map((el) => {
        return <option value={el}>{el}</option>;
      })
    );

    let numberResult = [
      <option value="" selected disabled>
        Please select
      </option>,
    ];
    numberResult.push(
      this.state.number.map((el) => {
        return <option value={el}>{el}</option>;
      })
    );
    this.setState({
      staff: Response.data.result,
      radio,
      result,
      data,
      assignments: scheduleResult,
      locations: locResult,
      weekday: WeekResult,
      number: numberResult,
    });
  }
  handleDelete() {
    var data = JSON.stringify({
      data: {
        staffID: this.Result.current.state.radio,
        courseCode: this.state.delete,
      },
    });

    var config = {
      method: "delete",
      url: "http://localhost:4000/ci/deleteTafromCourse",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Tyipe": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        toast.success("Course assignment was deleted Successfully");
      })
      .catch(function (error) {
        toast.error(error.response.data.msg);
      });
  }
  handleAssign() {
    var data = JSON.stringify({
      data: {
        staffID: this.Result.current.state.radio,
        courseCode: this.state.assign,
      },
    });
    var config = {
      method: "post",
      url: "http://localhost:4000/ci/assignTaToCourse",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success("Course was assigned to a member Successfully");
      })
      .catch(function (error) {
        toast.error(error.response.data.msg);
      });
  }
  async filterHandler(courseFilter) {
    courseFilter = courseFilter ? courseFilter.target.value : courseFilter;
    console.log(courseFilter);
    var config = {
      method: "get",
      url:
        "http://localhost:4000/ci/viewStaff" +
        (courseFilter ? "?courseCode=" + courseFilter : ""),
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEzOTY0NjI3fQ.bKaLJoATEKC6KLgydvBDYPPqt0VmqnKjFAE-oGxyL1o",
      },
    };
    var config2 = {
      method: "get",
      url: "http://localhost:4000/hod/getCourses",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMzkyNzA1N30.MQ0Zkx2kacSKuSiQaFu0SexhYmqCiSNAJdrvkPo9uGI",
      },
    };
    console.log(config);
    let [Response, result2] = await Promise.all([
      axios(config),
      axios(config2),
    ]);
    let radio = Array(Response.data.result.length).fill(false);
    let result = [
      <option value="" selected disabled>
        Please select
      </option>,
    ];
    result.push(
      result2.data.result.map((el) => {
        return <option value={el}>{el}</option>;
      })
    );

    this.setState({
      staff: Response.data.result,
      radio,
      result,
    });
  }

  handleClick() {
    var data = JSON.stringify({
      data: {
        staffID: this.Result.current.state.radio,
        courseCodeBefore: this.state.courseCodeBefore,
        courseCodeAfter: this.state.courseCodeAfter,
      },
    });
    console.log(data);

    var config = {
      method: "post",
      url: "http://localhost:4000/ci/updateTACourse",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success("Success");
      })
      .catch(function (error) {
        toast.error(error.response.data.msg);
      });
  }
  handleAssignSlot() {
    var axios = require("axios");
    var data = JSON.stringify({
      data: {
        staffID: this.Result.current.state.radio,
        weekday: this.state.assignWeekDay,
        number: this.state.assignNumber,
        courseCode: this.state.courseCode,
        location: this.state.assignLocation,
      },
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/ci/AssignUnassignedSlot",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEzOTY0NjI3fQ.bKaLJoATEKC6KLgydvBDYPPqt0VmqnKjFAE-oGxyL1o",
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(config);

    axios(config)
      .then(function (response) {
        toast.success("Course updated Successfully");
      })
      .catch(function (error) {
        toast.error(error.response.data.msg);
      });
  }
  handleDeleteSlot() {
    var axios = require("axios");
    var data = JSON.stringify({
      data: {
        staffID: this.Result.current.state.radio,
        weekday: this.state.assignWeekDay,
        number: this.state.assignNumber,
        courseCode: this.state.courseCode,
        location: this.state.assignLocation,
      },
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/ci/deleteAcademicFromSlot",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEzOTY0NjI3fQ.bKaLJoATEKC6KLgydvBDYPPqt0VmqnKjFAE-oGxyL1o",
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(config);

    axios(config)
      .then(function (response) {
        toast.success("Success");
      })
      .catch(function (error) {
        toast.error(error.response.data.msg);
      });
  }
  handleUpdateSlot() {
    var axios = require("axios");
    var data = JSON.stringify({
      data: {
        staffID: this.Result.current.state.radio,
        courseCode: this.state.courseCodeBefore,

        weekdayBefore: this.state.updateWeekDayBefore,
        numberBefore: this.state.updateNumberBefore,
        locationBefore: this.state.updateLocationBefore,
        weekdayAfter: this.state.updateWeekDayBefore,
        numberAfter: this.state.updateNumberAfter,
        locationAfter: this.state.updateLocationAfter,
      },
    });

    console.log(data);
    var config = {
      method: "post",
      url: "http://localhost:4000/ci/updateSlot",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEzOTY0NjI3fQ.bKaLJoATEKC6KLgydvBDYPPqt0VmqnKjFAE-oGxyL1o",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success("Success");
      })
      .catch(function (error) {
        toast.error(error.response.data.msg);
      });
  }
  render() {
    return (
      <Container>
        <ToastContainer />
        <div>Filter (Instructors only ... doesnt include the TAs):</div>
        <Form.Control
          value={this.state.courseFilter}
          onChange={this.filterHandler.bind(this)}
          type="text"
          placeholder="Enter course code to be able to filter by course"
        />
        <ViewProfiles ref={this.Result} staff={this.state} />{" "}
        <div>
          Please select a staffID first in order to perform the next
          functionalities
        </div>
        <div class="d-flex justify-content-around">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="collapse"
            href="#assign"
            aria-controls="assign"
          >
            Assign member to a course{" "}
          </button>

          <button
            type="button"
            class="btn btn-warning"
            onClick={() => {
              this.setState({ show: this.state.show });
            }}
            data-toggle="collapse"
            href="#multiCollapseExample1"
            aria-controls="multiCollapseExample1"
            aria-label="Default select example"
            role="button"
            aria-expanded="true"
          >
            Update member courses
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-toggle="collapse"
            href="#delete"
            aria-controls="delete"
          >
            Delete member from a course{" "}
          </button>
        </div>
        <div class="collapse multi-collapse" id="delete">
          <label for="sel1">Delete course:</label>
          <select
            class="form-select"
            onChange={this.deleteValue.bind(this)}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.result}
          </select>

          <br />
          <button
            type="button"
            class="btn btn-danger"
            onClick={this.handleDelete.bind(this)}
          >
            Delete Assignment{" "}
          </button>
        </div>
        <div class="collapse multi-collapse" id="multiCollapseExample1">
          <label for="sel1">Update course: The old course</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={this.setBeforeCode.bind(this)}
            onfocus="this.selectedIndex = -1;"
          >
            {this.state.result}
          </select>

          <label for="sel2">Update course: The new course</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={this.setAfterCode.bind(this)}
            onfocus="this.selectedIndex = -1;"
          >
            {this.state.result}
          </select>

          <br />
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.handleClick}
          >
            Submit Update{" "}
          </button>
        </div>
        <div class="collapse multi-collapse" id="assign">
          <label for="sel1">Assign course:</label>
          <select
            class="form-select"
            onChange={this.setValue.bind(this)}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.result}
          </select>

          <br />
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.handleAssignSlot.bind(this)}
          >
            Submit Assignment{" "}
          </button>
        </div>
        <br></br>
        <div class="d-flex justify-content-around">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="collapse"
            href="#assignSlot"
            aria-controls="assignSlot"
          >
            Assign slot to a member{" "}
          </button>

          <button
            type="button"
            class="btn btn-warning"
            onClick={() => {
              this.setState({ show: this.state.show });
            }}
            data-toggle="collapse"
            href="#updateSlot"
            aria-controls="updateSlot"
            aria-label="Default select example"
            role="button"
            aria-expanded="true"
          >
            Update member slot
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-toggle="collapse"
            href="#deleteSlot"
            aria-controls="deleteSlot"
          >
            Delete member from a slot{" "}
          </button>
        </div>
        <div class="collapse multi-collapse" id="deleteSlot">
          <label for="sel1">choose the course code:</label>
          <select
            class="form-select"
            onChange={(e) => this.setState({ courseCode: e.target.value })}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.result}
          </select>

          <label for="sel1">choose the weekday:</label>
          <select
            class="form-select"
            onChange={(e) => this.setState({ assignWeekDay: e.target.value })}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.weekday}
          </select>
          <label for="sel1">choose the slot number:</label>
          <select
            class="form-select"
            onChange={(e) => this.setState({ assignNumber: e.target.value })}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.number}
          </select>
          <label for="sel1">choose the location:</label>
          <select
            class="form-select"
            onChange={(e) => this.setState({ assignLocation: e.target.value })}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.locations}
          </select>

          <br />
          <br />
          <button
            type="button"
            class="btn btn-danger"
            onClick={this.handleDeleteSlot.bind(this)}
          >
            Delete Slot Assignment{" "}
          </button>
        </div>
        <div class="collapse multi-collapse" id="updateSlot">
          <label for="sel1">choose the course code:</label>
          <select
            class="form-select"
            onChange={(e) =>
              this.setState({ courseCodeBefore: e.target.value })
            }
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.result}
          </select>

          <label for="sel1">choose the old weekday:</label>
          <select
            class="form-select"
            onChange={(e) =>
              this.setState({ updateWeekDayBefore: e.target.value })
            }
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.weekday}
          </select>
          <label for="sel1">choose the old slot number:</label>
          <select
            class="form-select"
            onChange={(e) =>
              this.setState({ updateNumberBefore: e.target.value })
            }
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.number}
          </select>
          <label for="sel1">choose the old location:</label>
          <select
            class="form-select"
            onChange={(e) =>
              this.setState({ updateLocationBefore: e.target.value })
            }
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.locations}
          </select>

          <label for="sel1">choose the new weekday:</label>
          <select
            class="form-select"
            onChange={(e) =>
              this.setState({ updateWeekDayAfter: e.target.value })
            }
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.weekday}
          </select>
          <label for="sel1">choose the new slot number:</label>
          <select
            class="form-select"
            onChange={(e) =>
              this.setState({ updateNumberAfter: e.target.value })
            }
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.number}
          </select>
          <label for="sel1">choose the new location:</label>
          <select
            class="form-select"
            onChange={(e) =>
              this.setState({ updateLocationAfter: e.target.value })
            }
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.locations}
          </select>

          <br />
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.handleUpdateSlot.bind(this)}
          >
            Submit Update{" "}
          </button>
        </div>
        <div class="collapse multi-collapse" id="assignSlot">
          <label for="sel1">choose the course code:</label>
          <select
            class="form-select"
            onChange={(e) => this.setState({ courseCode: e.target.value })}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.result}
          </select>

          <label for="sel1">choose the weekday:</label>
          <select
            class="form-select"
            onChange={(e) => this.setState({ assignWeekDay: e.target.value })}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.weekday}
          </select>
          <label for="sel1">choose the slot number:</label>
          <select
            class="form-select"
            onChange={(e) => this.setState({ assignNumber: e.target.value })}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.number}
          </select>
          <label for="sel1">choose the location:</label>
          <select
            class="form-select"
            onChange={(e) => this.setState({ assignLocation: e.target.value })}
            onfocus="this.selectedIndex = -1;"
            aria-label="Default select example"
          >
            {this.state.locations}
          </select>

          <br />
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.handleAssignSlot.bind(this)}
          >
            Submit Assignment{" "}
          </button>
        </div>
        <br></br>
        <br />
        <br />
        <hr
          style={{
            color: "black",
            backgroundColor: "black",
            height: 5,
          }}
        />
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="collapse"
          href="#coverage"
          aria-controls="coverage"
        >
          Show Coverage{" "}
        </button>
        <div class="collapse multi-collapse" id="coverage">
          <p className="Table-header">Coverage</p>

          <BootstrapTable
            keyField="id"
            data={this.state.data}
            columns={this.state.columns}
          />
        </div>
        <br />
        <br />
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="collapse"
          href="#assignment"
          aria-controls="assignment"
        >
          Show course Assignments{" "}
        </button>
        <div class="collapse multi-collapse" id="assignment">
          <p className="Table-header">Assignments</p>
          {this.state.assignments}
        </div>
      </Container>
    );
    //    ));
  }
}

export default CIStaff;
