import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as departmentService from "../components/departments/departmentService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class updateDepartment extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        oldname: this.props.location.state.oldname,
        faculty: this.props.location.state.faculty,
        HODID: ""
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

        const newDepartment = {
            name: this.state.name,
            HODID: this.state.HODID
        };

        departmentService.updateDepartment(this.state.faculty, this.state.oldname, newDepartment)
        .then((res) => {
            toast.success("Department " + this.state.oldname + " was updated successfully");
            getHistory().push('/departments');
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
            <Form.Group as={Col} controlId="Faculty" md="4">
            <Form.Label>Faculty name</Form.Label>
            <Form.Control
                
                type="text"
                placeholder= {this.state.faculty}
                readOnly
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group as={Col} controlId="Department" md="4">
            <Form.Label>Department name</Form.Label>
            <Form.Control
                
                type="text"
                placeholder= {this.state.oldname}
                readOnly
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group as={Col} controlId="New Department" md="4">
            <Form.Label>New Department name</Form.Label>
            <Form.Control
                type="text"
                placeholder="enter the Department's name"
                onChange= {(event) => { this.state.name = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group as={Col} controlId="HOD" md="4">
            <Form.Label>Head of department(HOD) ID</Form.Label>
            <Form.Control
                type="text"
                placeholder="enter the New HOD's ID"
                onChange= {(event) => { this.state.HODID = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
        </Form.Row>
        <Button type="submit">Update department</Button>
        </Form>
        </Container>
        );
    }
}

export default updateDepartment;