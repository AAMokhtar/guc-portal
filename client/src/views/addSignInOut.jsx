import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as staffService from "../components/staffManagement/staffService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class AddSignInOut extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        staffID: this.props.location.state.staffID,
        direction: "",
        dateTime: ""
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

        const InOut = {
            inOut: this.state.direction == "Sign in"? "IN": "OUT",
            attendanceDateTime: this.state.dateTime
        }


        staffService.addSignInOut(this.state.staffID, InOut)
        .then((res) => {
            toast.success(this.state.direction + " was added successfully");
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
            <Form.Group as={Col} controlId="StaffID" md="4">
            <Form.Label>Staff ID</Form.Label>
            <Form.Control
                readOnly
                type="text"
                placeholder= {this.state.staffID}
                onChange= {(event) => { this.state.staffID = event.target.value }}
            />
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

            <Form.Group as={Col} controlId="Direction" md="4">
            <Form.Label>Direction</Form.Label>
            <Form.Control
             required
             placeholder="select a direction" 
             as="select"
             multiple
             onChange= {(event) => { this.state.direction = event.target.value }}
            >
                <option>Sign in</option>
                <option>Sign out</option>
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="DateTime" md="4">
            <Form.Label>Date and time</Form.Label>
            <Form.Control
                required
                type="datetime-local"
                onChange= {(event) => { this.state.dateTime = event.target.value }}
            />
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

        </Form.Row>
        <Button type="submit">Add sign in/out</Button>
        </Form>
        </Container>
        );
    }
}

export default AddSignInOut;