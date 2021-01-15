import React, { Component } from "react";
import { Container, Jumbotron , Table} from "react-bootstrap";
import * as staffService from "../components/staffManagement/staffService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class ViewStaff extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
        staffList: [],
        user: JSON.parse(localStorage.getItem("user")),
        isHR: false
    };

    this.onDeleteStaff = this.onDeleteStaff.bind(this);
    this.onModify = this.onModify.bind(this);
    this.modifySalary = this.modifySalary.bind(this);
    this.viewAttendance = this.viewAttendance.bind(this);
    this.addSignInOut = this.addSignInOut.bind(this);

  }


  componentDidMount() {

    this.setState({
        isHR: this.state.user.role == "HR"
    })
    //get all staff members
    staffService.getStaff().then((res) => {
      this.setState({ staffList: res });
    })
    .catch(err => {
        toast.error("failed to load staff");
    });
  }

  onDeleteStaff(staffID, index){
    staffService.deleteStaff(staffID)
    .then(res => {
        var elem = document.getElementById("row" + index);
        elem.parentNode.removeChild(elem);

        toast.success("user deleted successfully");
    })
    .catch(err => {
        if(err.response.data.msg)
            toast.error(err.response.data.msg);
        else
            toast.error(err.response.data);
    });
  };

  onModify(staffID){
    getHistory().push({
        pathname: "/updateStaff",
        state: { staffID: staffID }
    })
  }

  modifySalary(staffID){
    getHistory().push({
        pathname: "/updateSalary",
        state: { staffID: staffID }
    })
  }

  viewAttendance(staffID){
    getHistory().push({
        pathname: "/viewStaffAttendance",
        state: { staffID: staffID }
    })
  }

  addSignInOut(staffID){
    getHistory().push({
        pathname: "/addSignInOut",
        state: { staffID: staffID }
    })
  }

  render() {
    return (
      <Container>
        <Jumbotron>
          <Container>
            <h1>Staff members</h1>
            <p>
              On this page, you can view all of the staff members.
            </p>
          </Container>
        </Jumbotron>
        <Table striped bordered hover>
  <thead>
    <tr className="text-center">
      <th>#</th>
      <th>Staff ID</th>
      <th>Role</th>
      <th>Email</th>
      <th>Name</th>
      <th>Day off</th>
      {this.state.isHR  &&
       <th>Salary</th>}
       {this.state.isHR  &&
       <th>Actions</th>
       }
    </tr>
  </thead>
  <tbody>
    {this.state.staffList.map((member, index) => {
        return (<tr id={"row" + index}>
        <td className="text-center">{index}</td>
        <td className="text-center">{member.staffID}</td>
        <td className="text-center">{member.role}</td>
        <td className="text-center">{member.email}</td>
        <td className="text-center">{member.name?member.name:"-"}</td>
        <td className="text-center">{member.dayOff?member.dayOff:"-"}</td>
        {this.state.isHR && 
         <td className="text-center">{member.salary?member.salary:0}</td>
        }
        { this.state.isHR && 
        <th>
            <center>
            <a className="btn btn-primary m-2" onClick={() => {this.onModify(member.staffID)}} role="button">
            Modify
            </a>

            <a className="btn btn-primary btn-danger m-2" role="button" onClick={() => {this.onDeleteStaff(member.staffID, index)}}>
            Delete
            </a>

            <a className="btn btn-primary m-2" role="button" onClick={() => {this.modifySalary(member.staffID)}}>
            Change salary
            </a>

            <a className="btn btn-primary m-2" role="button" onClick={() => {this.viewAttendance(member.staffID)}}>
            View attendance
            </a>

            { member.staffID != this.state.user.staffID &&
            <a className="btn btn-primary m-2" role="button" onClick={() => {this.addSignInOut(member.staffID)}}>
            Add sign in/out
            </a>
            }
            </center>

            
        </th>}
    </tr>
    )
    })}
    
  </tbody>
</Table>
      </Container>
    );
  }
}

export default ViewStaff;
