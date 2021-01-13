import React, { Component } from "react";
import { Container, Jumbotron, Table, Button, Row, Col, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom';

class Attendance extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Jumbotron>
          <Row>
            <Col>
              {" "}
              <h1>Attendance Record</h1>
            </Col>
            <Col>
              <h6>
                Extra Hours <span>12</span>
              </h6>
              <p>
            <Button variant="secondary"><Link to='/missingDays' style={{color:'#fff'}}>Missing Days</Link></Button>
          </p>
            </Col>
          </Row>
          <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
          {/**todo: link with required backend functions */}
            <Nav.Item>
            <Nav.Link href="#">Month</Nav.Link>
            </Nav.Item>
      
            <Nav.Item>
            <Nav.Link href="#">All</Nav.Link>

            </Nav.Item>
          </Nav>
          
        </Jumbotron>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Tutorial</th>
                <th>Slot</th>
                <th>Date</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Otto</td>
                <td>Otto</td>

                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}

export default Attendance;
