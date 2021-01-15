import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as staffService from "../components/staffManagement/staffService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class UpdateSalary extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        staffID: this.props.location.state.staffID,
        salary: 0
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

        const newSalary = this.state.salary;

        staffService.updateSalary(this.state.staffID , newSalary)
        .then((res) => {
            toast.success("salary was updated successfully");
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

            <Form.Group as={Col} controlId="salary" md="4">
            <Form.Label>New salary</Form.Label>
            <Form.Control
                type="number"
                min="0"
                placeholder="enter salary"
                onChange= {(event) => { this.state.salary = event.target.value }}
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">enter a valid salary</Form.Control.Feedback>
            </Form.Group >          

        </Form.Row>
        
        <Button type="submit">Update salary</Button>
        </Form>
        </Container>
        );
    }
}

export default UpdateSalary;