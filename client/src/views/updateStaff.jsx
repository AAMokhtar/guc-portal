import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as staffService from "../components/staffManagement/staffService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class UpdateStaff extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        staffID: this.props.location.state.staffID,
        email:"", 
        name: "",
        gender:"Male",
        leaveBalance: 0,
        accidentDays: 0,
        officeLocation:"",
        faculty:"",
        department:"",
        others:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else{

        const updatedUser = {
            staffID: this.state.staffID,
            email: this.state.email, 
            name: this.state.name,
            gender:this.state.gender,
            leaveBalance: this.state.leaveBalance,
            accidentDays: this.state.accidentDays,
            officeLocation: this.state.officeLocation,
            faculty: this.state.faculty,
            department: this.state.department,
            others: { additionalInfo: this.state.others}
        };

        staffService.updateStaff(updatedUser)
        .then((res) => {
            toast.success("User was updated successfully");
            getHistory().push('/viewStaff');
            
        })
        .catch(err => {
            if(err.response.data.msg)
                toast.error(err.response.data.msg);
            else
                toast.error(err.response.data);
        })
    }

    this.setState({
        validated: true
    });
    
  };

  render(){
    return (
        <Container>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Row>

            <Form.Group as={Col} controlId="staffID" md="4">
            <Form.Label>staff ID</Form.Label>
            <Form.Control
                readOnly
                type="text"
                placeholder= {this.state.staffID}
                onChange= {(event) => { this.state.staffID = event.target.value }}
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">enter a valid email</Form.Control.Feedback>
            </Form.Group >

            <Form.Group as={Col} controlId="email" md="4">
            <Form.Label>Email</Form.Label>
            <Form.Control
                id="validationCustom02"
                type="email"
                placeholder="enter Email"
                onChange= {(event) => { this.state.email = event.target.value }}
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">enter a valid email</Form.Control.Feedback>
            </Form.Group >

            <Form.Group as={Col} controlId="name" md="4">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="enter name"
                onChange= {(event) => { this.state.name = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group as={Col} controlId="gender" md="4">
            <Form.Label>Gender</Form.Label>
            <Form.Control
             placeholder="select a gender" 
             as="select"
             multiple
             onChange= {(event) => { this.state.gender = event.target.value }}
            >
                <option>Male</option>
                <option>Female</option>
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

        </Form.Row>
        <Form.Row>

            <Form.Group as={Col} controlId="leaveBalance" md="4">
            <Form.Label>Leave balance</Form.Label>
            <Form.Control
             placeholder="select a role" 
             type="number"
             step=".01"
             min="0"
             onChange= {(event) => { this.state.leaveBalance = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="accident days" md="4">
            <Form.Label>Accident days</Form.Label>
            <Form.Control
                type="number"
                min="0"
                placeholder="enter accident days"
                onChange= {(event) => { this.state.accidentDays = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="office location" md="4">
            <Form.Label>Office location</Form.Label>
            <Form.Control
             type="text"
             placeholder="enter office location"
             onChange= {(event) => { this.state.officeLocation = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} controlId="faculty" md="4">
            <Form.Label>Faculty name</Form.Label>
            <Form.Control
             placeholder="enter the faculty name" 
             type="text"
             onChange= {(event) => { this.state.faculty = event.target.value }}
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group >

            <Form.Group as={Col} controlId="department" md="4">
            <Form.Label>Department name</Form.Label>
            <Form.Control
                type="text"
                placeholder="enter the department"
                onChange= {(event) => { this.state.department = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group as={Col} controlId="others" md="4">
            <Form.Label>Additional info</Form.Label>
            <Form.Control
             placeholder="any additional info" 
             type="text"
             onChange= {(event) => { this.state.others = event.target.value }}
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group >   

        </Form.Row>
        <Button type="submit">Update staff member</Button>
        </Form>
        </Container>
        );
    }
}

export default UpdateStaff;