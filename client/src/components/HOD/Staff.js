import React, { Component, createRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
let token = localStorage.getItem("token");
var axios = require("axios");

export class Staff extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      staff: [],
      radio: [],
      show: false,
      result: [],
      schedule: [],
      assign: null,
      courseCodeBefore: null,
      courseCodeAfter: null,
      delete: null,
    };
    this.Result = createRef();
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
      url: "http://localhost:4000/hod/viewStaff",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    var config2 = {
      method: "get",
      url: "http://localhost:4000/hod/getCourses",
      headers: {
        "auth-token": localStorage.getItem("token"),
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
  handleDelete() {
    var data = JSON.stringify({
      data: {
        staffID: this.Result.current.state.radio,
        courseCode: this.state.delete,
      },
    });

    var config = {
      method: "delete",
      url: "http://localhost:4000/hod/deleteInstructor",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
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
      url: "http://localhost:4000/hod/assignInstructor",
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
      url: "http://localhost:4000/hod/updateInstructor",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success("Course updated Successfully");
      })
      .catch(function (error) {
        toast.error(error.response.data.msg);
      });
  }

  render() {
    return (
      <Container>
        <ToastContainer />
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
            onClick={this.handleAssign.bind(this)}
          >
            Submit Assignment{" "}
          </button>
        </div>
      </Container>
    );
    //    ));
  }
}

export default Staff;
