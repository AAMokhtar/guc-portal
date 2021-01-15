import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as departmentService from "../components/departments/departmentService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class AddDepartment extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        name: "",
        faculty: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      toast.error("please provide all the fields");
    }
    else{
        this.setState({
            validated: true
        });

        const facultyName = this.state.faculty;
        const newDepartment = this.state.name;
    

        departmentService.addDepartment(facultyName, newDepartment)
        .then((res) => {
            toast.success("Department " + newDepartment + " was added successfully");
            getHistory().push('/departments');
        })
        .catch(err => {
            if(err.response.data.msg)
                toast.error(err.response.data.msg);
            else
                toast.error(err.response.data);
        })
    }

    
  };

  render(){
    return (
        <Container>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Row>
        <Form.Group as={Col} controlId="Faculty" md="4">
            <Form.Label>Faculty name</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="enter the faculty under which you want to add your department"
                onChange= {(event) => { this.state.faculty = event.target.value }}
            />
            </Form.Group>
            <Form.Group as={Col} controlId="Department" md="4">
            <Form.Label>Department name</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="enter the Department's name"
                onChange= {(event) => { this.state.name = event.target.value }}
            />
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Row>
        <Button type="submit">Add Department</Button>
        </Form>
        </Container>
        );
    }
}

export default AddDepartment;