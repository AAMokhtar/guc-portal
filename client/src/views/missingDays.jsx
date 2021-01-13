import React, { Component } from "react";
import { Container, Jumbotron , Table} from "react-bootstrap";
class MissingDays extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Jumbotron>
          <Container>
            <h1>Missing Days</h1>
            <p>
              This page shows the days in which your attendance was not
              successfully recorded
            </p>
          </Container>
        </Jumbotron>
        <Table striped bordered hover>
          {/**todo: PLACEHOLDERS */}
  <thead>
    <tr>
      <th>#</th>
      <th>Basant</th>
      <th>Days Missed</th>
      <th>ACL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>placeholder</td>
      <td>placeholder</td>
      <td>placeholder</td>
    </tr>
    <tr>
      <td>2</td>
      <td>placeholder</td>
      <td>placeholder</td>
      <td>placeholder</td>
    </tr>
    <tr>
      <td>3</td>
      <td>placeholder</td>
      <td>placeholder</td>
      <td>placeholder</td>

    </tr>
  </tbody>
</Table>
      </Container>
    );
  }
}

export default MissingDays;
