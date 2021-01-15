import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as staffService from "../components/staffManagement/staffService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

class AddStaff extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        email:"", 
        name: "",
        gender:"Male",
        dayOff:"",
        salary: 0,
        officeLocation:"",
        faculty:"",
        department:"",
        role:"",
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

        const newUser = {
            email: this.state.email, 
            name: this.state.name,
            gender:this.state.gender,
            dayOff: this.state.dayOff,
            salary: this.state.salary,
            officeLocation: this.state.officeLocation,
            faculty: this.state.faculty,
            department: this.state.department,
            role: this.state.role,
            others: { additionalInfo: this.state.others}
        };

        staffService.addStaff(newUser)
        .then((res) => {
            toast.success("User was added successfully");
            setTimeout(()=> window.location.reload(), 1000);
            
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

            <Form.Group as={Col} controlId="role" md="4">
            <Form.Label>Role*</Form.Label>
            <Form.Control
             required  
             placeholder="select a role" 
             as="select"
             multiple
             onChange= {(event) => { this.state.role = event.target.value }}
            >
                <option>HR</option>
                <option>Course Coordinator</option>
                <option>Course Instructor</option>
                <option>TA</option>
                <option>HOD</option>
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="email" md="4">
            <Form.Label>Email*</Form.Label>
            <Form.Control
                id="validationCustom02"
                required
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

        </Form.Row>
        <Form.Row>

            <Form.Group as={Col} controlId="gender" md="4">
            <Form.Label>Gender*</Form.Label>
            <Form.Control
             required  
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

            <Form.Group as={Col} controlId="salary" md="4">
            <Form.Label>Salary</Form.Label>
            <Form.Control
                type="number"
                placeholder="enter salary"
                onChange= {(event) => { this.state.salary = event.target.value }}
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

            <Form.Group as={Col} controlId="day off" md="4">
            <Form.Label>Day off</Form.Label>
            <Form.Control
             placeholder="select a day" 
             as="select"
             multiple
             onChange= {(event) => { this.state.dayOff = event.target.value }}
            >
                <option>Saturday</option>
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
            </Form.Control>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group >   
            
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
        <Button type="submit">Add staff member</Button>
        </Form>
        </Container>
        );
    }
}

export default AddStaff;