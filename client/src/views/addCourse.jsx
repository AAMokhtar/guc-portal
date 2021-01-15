import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as courseService from "../components/courses/courseService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class AddCourse extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        courseCode: "",
        department: ""
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

        const department = this.state.department;
        const newCourse = this.state.courseCode;
    

        courseService.addCourse(department, newCourse)
        .then((res) => {
            toast.success("Course " + newCourse + " was added successfully");
            getHistory().push('/courses');
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
            <Form.Label>department name</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="enter the department under which you want to add your course"
                onChange= {(event) => { this.state.department = event.target.value }}
            />
            </Form.Group>
            <Form.Group as={Col} controlId="Course" md="4">
            <Form.Label>Course code</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="enter the course's code"
                onChange= {(event) => { this.state.courseCode = event.target.value }}
            />
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Row>
        <Button type="submit">Add Course</Button>
        </Form>
        </Container>
        );
    }
}

export default AddCourse;