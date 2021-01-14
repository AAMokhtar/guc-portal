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
import faker from "faker";
import SmartDataTable from "react-smart-data-table";
const axios = require("axios");
axios.defaults.headers.common["auth-token"] = localStorage.getItem("token");

class ViewStaffRequests extends Component {
  state = {
    show: false,
    persons: [],
  };

  componentDidMount() {
    console.log("getting");
    axios.get("http://localhost:4000/hod/viewStaff").then((res) => {
      console.log("resss", res);
      const persons = res.data;
      this.setState({ persons });
    });
  }

  render() {
    const handleShow = () => {
      this.setState({ show: true });
    };

    const handleClose = () => {
      this.setState({ show: false });
    };

    return (
      <Container>
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
                <Form.Control type="text" placeholder="Enter ur response" />
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
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Execuse</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <Col>
                  <Button varient="success">Accept</Button>{" "}
                  <Button onClick={handleShow} variant="danger">
                    Reject
                  </Button>
                </Col>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>
                <Col>
                  <Button varient="success">Accept</Button>{" "}
                  <Button onClick={handleShow} variant="danger">
                    Reject
                  </Button>
                </Col>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>
                <Col>
                  <Button varient="success">Accept</Button>{" "}
                  <Button onClick={handleShow} variant="danger">
                    Reject
                  </Button>
                </Col>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default ViewStaffRequests;
