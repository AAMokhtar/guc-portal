import React, { Component } from 'react';
import {Carousel, Image, Container, Row, Col, Button} from 'react-bootstrap'
import './some-styling.css'
import { MdEdit } from "react-icons/md";
const axios = require('axios');
axios.defaults.headers.common['auth-token'] = localStorage.getItem('token');


let name;
let role;
let staffID;
let email;

let resData;

//department?
//faculty?
//courses?


class ViewProfile extends Component {

    
handleViewProfile(event){

    axios.get('http://localhost:4000/staff/myprofile'
      )
      .then(function (response) {
        // handle success
        console.log("view profile works");
        console.log(response.data);
        resData = response.data;
        // switch(role){
        //     case "HR": responseItems = [role,name,staffID,email]; break;
        //     case default: responseItems = [role,name,staffID,email]; break;
        // }
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

    state = {  }
    render() { 
        this.handleViewProfile();

        return ( <div>
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.ibb.co/NNPw4pp/imageonline-co-darkenimage.png"
      alt="First slide"
      height = "400"
    />
    <Carousel.Caption>
      <h3>Username</h3>
      <Container className = "some-space">
      </Container>
      <Container>
            <Row>
                <Col>
                </Col>
                <Col>
                <Image src = "https://lh3.googleusercontent.com/a-/AOh14Gj43WnACEauUzP5IxS3ZyPaNO5CsVmPIZThR-ZKfAg=s288-c-rg-br100" height = "250vh" width = "250vh"></Image>
                </Col>
                <Col>
                <Row></Row>
                <Row></Row>
                <Row><Button variant="secondary"> Name: {resData}</Button></Row>
                <Row><Button variant="secondary" href="/editProfile"><MdEdit size = {40} className = "color-white"></MdEdit></Button></Row>

</Col>
            </Row>

      </Container>
      <p>placeholder</p>
    </Carousel.Caption>
  </Carousel.Item>


    </Carousel>
        </div> );
    }
}
 
export default ViewProfile;