import React, { Component } from "react";
import { Container, Jumbotron , Table} from "react-bootstrap";
import * as staffService from "../components/staffManagement/staffService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import getHistory from "../index"
import { render } from "react-dom";

class ViewStaffMissing extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
        mList: [],
        isLoaded: false,
        user: JSON.parse(localStorage.getItem("user")),
        isHR: false
    };

    this.loadedPage = this.loadedPage.bind(this);
    this.loadingScreen = this.loadingScreen.bind(this);
  }


  componentDidMount() {

    this.setState({
        isHR: this.state.user.role == "HR"
    })
    //get all staff members
    staffService.viewMissing().then((res) => {
        
        this.setState({
           attList: res,
           isLoaded: true
        });
    })
    .catch(err => {
        toast.error("failed to load attendance");
    });
  }

  loadingScreen(){
    return(
        <center className="mt-3">
        <Loader
           type="Puff"
           color="#00BFFF"
           height={80}
           width={80}
           timeout={0} //3 secs
        />
        <p className="mt-2">Please wait for the table to load</p>
        </center>
    );
  }

  

  loadedPage() {
    return (
      <Container>
        <Jumbotron>
          <Container>
            <h1>Missing Hours/Days</h1>
            <p>
              On this page, you can view staff members with missing hours/days so far this month.
            </p>
          </Container>
        </Jumbotron>
        <Table striped bordered hover>
  <thead>
    <tr className="text-center">
      <th>#</th>
      <th>Staff ID</th>
      <th>Missing days</th>
      <th>Missing hours</th>
    </tr>
  </thead>
  <tbody>
    {this.state.mList.map((member, index) => {
        return (<tr id={"row" + index}>
        <td className="text-center">{index}</td>
        <td className="text-center">{member.date}</td>
        <td className="text-center">{member.missingDays}</td>
        <td className="text-center">{member.missingHours}</td>
    </tr>
    )
    })}
    
  </tbody>
</Table>
      </Container>
    );
  }

  render(){
      if(this.state.isLoaded){
          return this.loadedPage();
      }
      
      return this.loadingScreen();
  }
}


export default ViewStaffMissing;
