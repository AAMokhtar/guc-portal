import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as facultyService from "../components/faculties/facultyService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class UpdateFaculty extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        oldname: this.props.location.state.oldname,
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

        const newFaculty = {
            name: this.state.name,
        };

        facultyService.updateFaculty(this.state.oldname, newFaculty)
        .then((res) => {
            toast.success("Faculty " + this.state.oldname + " was updated successfully");
            getHistory().push('/faculties');
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
                placeholder= {this.state.oldname}
                readOnly
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group as={Col} controlId="New faculty" md="4">
            <Form.Label>New faculty name</Form.Label>
            <Form.Control
                type="text"
                placeholder="enter the faculty's name"
                onChange= {(event) => { this.state.name = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
        </Form.Row>
        <Button type="submit">Add Faculty</Button>
        </Form>
        </Container>
        );
    }
}

export default UpdateFaculty;