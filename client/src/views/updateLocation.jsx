import React, { Component, useState} from 'react';
import {Form, Col, Button, InputGroup, Container} from 'react-bootstrap';
import * as locationsService from "../components/locations/locationsService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"
// import { useLocation } from "react-router-dom";
// const location = useLocation();

class UpdateLocation extends Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        validated: false,
        oldname: this.props.location.state.oldname,
        name: "",
        capacity: 0,
        curSeats: 0,
        type: "OFFICE",
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

        const newLocation = {
            name: this.state.name,
            capacity: this.state.capacity,
            currentlyTakenSeats: this.state.curSeats, 
            type: this.state.type
        };

        locationsService.updateLocation(this.state.oldname, newLocation)
        .then((res) => {
            toast.success("Location " + this.state.oldname + " was updated successfully");
            getHistory().push('/locations');
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
            <Form.Group as={Col} controlId="Location" md="4">
            <Form.Label>Location</Form.Label>
            
            <Form.Control
                required
                type="text"
                placeholder= {this.state.oldname}
                readOnly
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group as={Col} controlId="Location" md="4">
            <Form.Label>New location</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="enter the location"
                onChange= {(event) => { this.state.name = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group as={Col} controlId="Capacity" md="4">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
                required
                type="number"
                placeholder="enter the location's capacity"
                onChange= {(event) => { this.state.capacity = event.target.value }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="CS" md="4">
            <Form.Label>currently occupied seats</Form.Label>
            <Form.Control
                type="number"
                placeholder="enter the number of occupied seats"
                defaultValue = {0}
                onChange= {(event) => { this.state.curSeats = event.target.value }}
                required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="Type" md="6">
            <Form.Label>Type</Form.Label>
            <Form.Control
             required  
             placeholder="select location type" 
             as="select"
             multiple
             onChange= {(event) => { this.state.type = event.target.value }}
            >
                <option>OFFICE</option>
                <option>HALL</option>
                <option>LAB</option>
                <option>TUTORIAL</option>
            </Form.Control>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please select a type.
            </Form.Control.Feedback>
            </Form.Group>
        </Form.Row>
        <Button type="submit">Add location</Button>
        </Form>
        </Container>
        );
    }
}

export default UpdateLocation;