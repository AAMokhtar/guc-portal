import React, { Component, setState } from "react";
import {
  Container,
  Jumbotron,
  Button,
  Table,
  Col,
  Form,
  Modal,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

import faker from "faker";
import SmartDataTable from "react-smart-data-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");
axios.defaults.headers.common["auth-token"] = localStorage.getItem("token");

class ViewStaffRequests extends Component {
  constructor(props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);

    this.state = {
      show: false,
      requestID: null,
      result: [],
      val: "",
    };
  }

  async componentWillMount() {
    var config = {
      method: "get",
      url: "http://localhost:4000/hod/viewRequests/",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    try {
      let response = await axios(config);
      this.setState({
        result: response.data.result,
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
  async handleChanges() {
    let { requestID, val } = this.state;
    var data = JSON.stringify({
      data: { requestID },
    });

    var config = {
      method: "post",
      url:
        "http://localhost:4000/hod/RejectRequest" +
        (val ? "?comment=" + val : ""),
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      let response = await axios(config);
      toast.success("Success!");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
  render() {
    const columns = [
      {
        dataField: "status",
        text: "Status",
      },
      {
        dataField: "comment",
        text: "Comments by the HOD",
      },
      {
        dataField: "senderID",
        text: "senderID",
      },
      {
        dataField: "receiverID",
        text: "receiverID",
      },
      {
        dataField: "reason",
        text: "Reason",
      },
      {
        dataField: "reasonDetails",
        text: "Reason Details",
      },
      {
        dataField: "sentDate",
        text: "sentDate",
      },
      {
        dataField: "responseDate",
        text: "replyDate",
      },
      {
        dataField: "decision",
        text: "   HOD Decision  ",
      },
    ];

    const handleShow = (requestID) => {
      this.setState({ show: true, requestID });
    };

    const handleClose = () => {
      this.setState({ show: false });
    };

    const handleAccept = async (requestID) => {
      var data = JSON.stringify({
        data: { requestID },
      });

      var config = {
        method: "post",
        url: "http://localhost:4000/hod/AcceptRequest",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log(config);
      try {
        let response = await axios(config);
        toast.success("Success!");
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    };
    let data = [];
    this.state.result.map((request) => {
      let { leave, dayOff, replacement, linkingSlot } = request;
      let reason;
      let reasonDetails;
      if (leave) {
        reason = "leave";
        reasonDetails = leave;
      }
      if (dayOff) {
        reason = "dayOff";
        reasonDetails = dayOff;
      }
      if (replacement) {
        reason = "replacement";
        reasonDetails = replacement;
      }
      if (linkingSlot) {
        reason = "linkingSlot";
        reasonDetails = linkingSlot;
      }
      let decision = (
        <Col>
          <Button varient="success" onClick={() => handleAccept(request._id)}>
            Accept
          </Button>{" "}
          <Button onClick={() => handleShow(request._id)} variant="danger">
            Reject
          </Button>
        </Col>
      );
      reasonDetails = !reasonDetails
        ? null
        : Object.keys(reasonDetails).map((key, i) => (
            <p key={i}>
              <span> {key}</span>
              <span> {reasonDetails[key]}</span>
            </p>
          ));
      data.push({ ...request, reasonDetails, reason, decision });
    });
    console.log(data);

    return (
      <Container>
        <ToastContainer />

        <Jumbotron>
          <h1>Staff Requests!</h1>
          <p>
            Here you can see, accept or refuse staff requests
            {this.state.persons}
          </p>
        </Jumbotron>

        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your reject message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {" "}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Response</Form.Label>
                <Form.Control
                  value={this.state.val}
                  onChange={(e) => this.setState({ val: e.target.value })}
                  type="text"
                  placeholder="Enter ur response"
                />
                <Form.Text className="text-muted">
                  Response will be viewd by the staff.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleChanges()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <BootstrapTable keyField="id" data={data} columns={columns} />
      </Container>
    );
  }
}

export default ViewStaffRequests;
