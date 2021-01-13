import React from 'react';
import Card from './card';
import './section.css';
import {Row,Col,Container, Jumbotron} from 'react-bootstrap';
import {FcBusinessman} from 'react-icons/fc'



function MainComponent()
{ //dashboard work here
    return (
        <div  id="home" >
            <div className="mt-4 padding" >

        <Jumbotron fluid>
        <Container>
      <Row>
          <Col  md="auto">
          <FcBusinessman size = {80}></FcBusinessman></Col>
          <Col>
          <h1>Welcome, username!</h1>
 </Col>
      </Row>
  
  </Container>
</Jumbotron>
            
            </div>
       
        
            <Container className = "container-shape">My Information</Container>
            <Container className = "some-space"></Container>
            <Container>
                <Row>
                    <Col>
                    <Card />
                    </Col>
                    <Col>
                    <Card />
                    </Col>
                    <Col>
                    <Card />
                    </Col>
                </Row>
            </Container>
            <Container className = "some-space"></Container>
            <Container>
                <Row>
                    <Col>
                    <Card />
                    </Col>
                    <Col>
                    <Card />
                    </Col>
                    <Col>
                    <Card />
                    </Col>
                </Row>
            </Container>
            
            <div className="d-flex">
            </div>
        </div>
    )
}

export default MainComponent;
