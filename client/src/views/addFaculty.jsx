import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as facultyService from "../components/faculties/facultyService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class AddFaculty extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        name: "",
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

        const newFaculty = this.state.name;
    

        facultyService.addFaculty(newFaculty)
        .then((res) => {
            toast.success("faculty " + newFaculty + " was added successfully");
            getHistory().push('/faculties');
        })
        .catch(err => {
            toast.error(err.response.data.msg);
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
                placeholder="enter the faculty's name"
                onChange= {(event) => { this.state.name = event.target.value }}
            />
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Row>
        <Button type="submit">Add faculty</Button>
        </Form>
        </Container>
        );
    }
}

export default AddFaculty;