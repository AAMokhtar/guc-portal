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
    this.state = {
      staff: [],
      radio: [],
      show: false,
      result: [],
      schedule: [],
    };
    this.Result = createRef();
  }

  async componentWillMount() {
    var config = {
      method: "get",
      url: "http://localhost:4000/hod/viewStaff",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMzc5ODI4NX0.wmk8jY-m0kuKJQvqOfaW4WNL2tGZGz4sqAY1YKPsGVQ",
      },
    };
    var config2 = {
      method: "get",
      url: "http://localhost:4000/hod/getCourses",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMzg2ODE0NH0.ATWhn6oXxmkh94iXOf0UysdRnxSBLKX3woQAuKlQyiE",
      },
    };

    let [Response, result2] = await Promise.all([
      axios(config),
      axios(config2),
    ]);
    let radio = Array(Response.data.result.length).fill(false);
    let result = result2.data.result.map((el) => {
      return <option value={el}>{el}</option>;
    });

    var config3 = {
      method: "get",
      url: "http://localhost:4000/academic/schedule",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNiIsInJvbGUiOiJDb3Vyc2UgSW5zdHJ1Y3RvciIsIm9iamVjdElEIjoiNWZkZmRmYmEyZGU2OWEzMGQ0MGIwZmYwIiwiZXhwIjoxNjEzODgwMTgzfQ._IOVoH6RLW5M50GzgUIKm_YFWFvKVAz_2jf0YWgHcts",
      },
    };

    let response = await axios(config3);

    this.setState({
      staff: Response.data.result,
      radio,
      result,
      schedule: response.data.schedule,
    });
    console.log(this.staff);
  }

  handleClick() {
    var data = JSON.stringify({
      data: {
        staffID: this.Result.current.state.radio,
        courseCodeBefore: "cs",
        courseCodeAfter: "CSEN 401",
      },
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/hod/updateInstructor",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklEIjoiYWMtNSIsInJvbGUiOiJIT0QiLCJvYmplY3RJRCI6IjVmZGUwZDU1NGRkMzBlMzRmYzI2NThlZiIsImV4cCI6MTYxMzg2ODE0NH0.ATWhn6oXxmkh94iXOf0UysdRnxSBLKX3woQAuKlQyiE",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success("Course updated Successfully");
      })
      .catch(function (error) {
        toast.error("Course update failed", error);
      });
  }

  render() {
    return (
      <Container>
        <ToastContainer />
        <div>
          {" "}
          <ViewProfiles ref={this.Result} staff={this.state} />{" "}
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
            role="button"
            aria-expanded="true"
          >
            Update member courses
          </button>
          <button type="button" class="btn btn-danger">
            Delete member from a course{" "}
          </button>
        </div>

        <div class="collapse multi-collapse" id="multiCollapseExample1">
          <label for="sel1">Update course:</label>
          <select class="form-select" aria-label="Default select example">
            {this.state.result}
          </select>

          <br />
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.handleClick}
          >
            Submit{" "}
          </button>
        </div>
        <div class="collapse multi-collapse" id="assign">
          <label for="sel1">Assign course:</label>
          <select class="form-select" aria-label="Default select example">
            {this.state.result}
          </select>

          <br />
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.handleClick}
          >
            Submit{" "}
          </button>
        </div>
      </Container>
    );
    //    ));
  }
}

export default Staff;
