import React, { Component } from "react";
import { Container, Jumbotron , Table} from "react-bootstrap";
import * as staffService from "../components/staffManagement/staffService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class ViewStaffAttendance extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
        staffID: this.props.location.state.staffID,
        attList: [],
        user: JSON.parse(localStorage.getItem("user")),
        isHR: false
    };
  }


  componentDidMount() {

    this.setState({
        isHR: this.state.user.role == "HR"
    })
    //get all staff members
    staffService.getStaffAttendance(this.state.staffID).then((res) => {
      this.setState({ attList: res });
    })
    .catch(err => {
        toast.error("failed to load attendance");
    });
  }

  render() {
    return (
      <Container>
        <Jumbotron>
          <Container>
            <h1>Staff Attendance</h1>
            <p>
              On this page, you can view a staff member's attendance records.
            </p>
          </Container>
        </Jumbotron>
        <Table striped bordered hover>
  <thead>
    <tr className="text-center">
      <th>#</th>
      <th>Date</th>
      <th>Sign in</th>
      <th>Sign out</th>
    </tr>
  </thead>
  <tbody>
    {this.state.attList.map((date, index) => {
        return (<tr id={"row" + index}>
        <td className="text-center">{index}</td>
        <td className="text-center">{date.date}</td>
        <td className="text-center">{date.signIn.map((signin, index) => {return <li>{signin}</li> })}</td>
        <td className="text-center">{date.signIn.map((signout, index) => {return <li>{signout}</li> })}</td>
    </tr>
    )
    })}
    
  </tbody>
</Table>
      </Container>
    );
  }
}

export default ViewStaffAttendance;
