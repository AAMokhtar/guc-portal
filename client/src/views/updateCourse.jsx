import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as courseService from "../components/courses/courseService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class updateCourse extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        oldname: this.props.location.state.oldname,
        department: this.props.location.state.department,
        code: ""
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

        const newCourse = {
            code: this.state.code,
        };

        courseService.updateCourse(this.state.department, this.state.oldname, newCourse)
        .then((res) => {
            toast.success("Course " + this.state.oldname + " was updated successfully");
            getHistory().push('/courses');
        })
        .catch(err => {
            console.log(err);
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
            <Form.Group as={Col} controlId="Department" md="4">
            <Form.Label>Department name</Form.Label>
            <Form.Control
                
                type="text"
                placeholder= {this.state.department}
                readOnly
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group as={Col} controlId="Course" md="4">
            <Form.Label>Course code</Form.Label>
            <Form.Control
                
                type="text"
                placeholder= {this.state.oldname}
                readOnly
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group as={Col} controlId="New course" md="4">
            <Form.Label>New course code</Form.Label>
            <Form.Control
                type="text"
                placeholder="enter the course's name"
                onChange= {(event) => { this.state.code = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
        </Form.Row>
        <Button type="submit">Update course</Button>
        </Form>
        </Container>
        );
    }
}

export default updateCourse;