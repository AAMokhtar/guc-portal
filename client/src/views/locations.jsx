import React, { Component } from "react";
import { Container, Jumbotron , Table} from "react-bootstrap";
import * as locationsService from "../components/locations/locationsService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class Locations extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
        locList: [],
        user: JSON.parse(localStorage.getItem("user")),
        isHR: false
    };

    this.onDeleteLocation = this.onDeleteLocation.bind(this);
    this.onModify = this.onModify.bind(this);

  }


  componentDidMount() {

    this.setState({
        isHR: this.state.user.role == "HR"
    })
    //get all locations
    locationsService.getLocations().then((res) => {
      console.log("res", res);
      const persons = res.data;
      this.setState({ locList: res });
    })
    .catch(err => {
        toast.error("failed to load locations");
    });
  }

  onDeleteLocation(location, index){
    locationsService.deleteLocation(location)
    .then(res => {
        var elem = document.getElementById("row" + index);
        elem.parentNode.removeChild(elem);

        toast.success(res);
    })
    .catch(err => {
        toast.error(err.response.data.msg);
    });
  };

  onModify(location){
    getHistory().push({
        pathname: "/updateLocation",
        state: { oldname: location }
    })
  }


  render() {
    return (
      <Container>
        <Jumbotron>
          <Container>
            <h1>Locations</h1>
            <p>
              In this page, you can view all the available locations on campus.
            </p>
          </Container>
        </Jumbotron>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Location</th>
      <th>Type</th>
      <th>Capacity</th>
      <th>Taken seats</th>
      {this.state.isHR && <th>Actions</th>}
    </tr>
  </thead>
  <tbody>
    {this.state.locList.map((location, index) => {
        return (<tr id={"row" + index}>
        <td className="text-center">{index}</td>
        <td className="text-center">{location.name}</td>
        <td className="text-center">{location.type.toUpperCase()}</td>
        <td className="text-center">{location.capacity}</td>
        <td className="text-center">{location.currentlyTakenSeats}</td>
        {this.state.isHR && 
        
        <th>
            <center>
            <a className="btn btn-primary m-3" onClick={() => {this.onModify(location.name)}} role="button">
            Modify
            </a>

            <a className="btn btn-primary btn-danger" role="button" onClick={() => {this.onDeleteLocation(location.name, index)}}>
            Delete
            </a>
            </center>
            
        </th>}
    </tr>
    )
    })}
    
  </tbody>
</Table>
<a className="btn btn-primary btn-success" href="/addLocation" role="button">
            Add location
</a>
      </Container>
    );
  }
}

export default Locations;
