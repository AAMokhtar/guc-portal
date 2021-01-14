import React, { Component, useEffect } from "react";
import {
  Container,
  Jumbotron,
  Button,
  Table,
  Col,
  Form,
  Modal,
} from "react-bootstrap";
import ViewProfiles from "../../views/viewStaffProfiles";
let token = localStorage.getItem("token");
var axios = require("axios");

export class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = { staff: [], radio: [] };
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

    let Response = await axios(config);
    let radio = Array(Response.data.result.length).fill(false);
    this.setState({ staff: Response.data.result, radio });
  }

  render() {
    //this.state.staff.map((st) => (

    return (
      <div>
        <div>
          {" "}
          <ViewProfiles staff={this.state} />
        </div>
        <div class="col-md-12 text-center">
          <button type="button" class="btn btn-primary">
            Assign member to a course{" "}
          </button>

          <button type="button" class="btn btn-warning">
            Update member courses
          </button>
          <button type="button" class="btn btn-danger">
            Delete member from a course{" "}
          </button>
        </div>
      </div>
    );
    //    ));
  }
}

export default Staff;
