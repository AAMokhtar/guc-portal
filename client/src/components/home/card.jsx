import React from 'react';
import './card-styling.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const CardUi = (props) => {
    return ( 
        <Link to={props.link}>

        <Card border="light" style={{ width: '18rem' ,color:'#000' }}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Title>Light Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk
            of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
            

        </Link>
     );
}

 
export default CardUi;