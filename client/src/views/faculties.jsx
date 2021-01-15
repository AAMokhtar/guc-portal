import React, { Component } from "react";
import { Container, Jumbotron , Table} from "react-bootstrap";
import * as facultyService from "../components/faculties/facultyService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class Faculties extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
        fList: [],
        user: JSON.parse(localStorage.getItem("user")),
        isHR: false
    };

    this.onDeleteFaculty = this.onDeleteFaculty.bind(this);
    this.onModify = this.onModify.bind(this);

  }


  componentDidMount() {

    this.setState({
        isHR: this.state.user.role == "HR"
    })
    //get all Faculties
    facultyService.getFaculties().then((res) => {
      this.setState({ fList: res });
    })
    .catch(err => {
        toast.error("failed to load Faculties");
    });
  }

  onDeleteFaculty(faculty, index){
    facultyService.deleteFaculty(faculty)
    .then(res => {
        var elem = document.getElementById("row" + index);
        elem.parentNode.removeChild(elem);

        toast.success(res);
    })
    .catch(err => {
        if(err.response.data.msg)
            toast.error(err.response.data.msg);
        else
            toast.error(err.response.data);
    });
  };

  onModify(faculty){
    getHistory().push({
        pathname: "/updateFaculty",
        state: { oldname: faculty }
    })
  }


  render() {
    return (
      <Container>
        <Jumbotron>
          <Container>
            <h1>Faculties</h1>
            <p>
              On this page, you can view all the available Faculties.
            </p>
          </Container>
        </Jumbotron>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Faculty name</th>
      {this.state.isHR && <th>Actions</th>}
    </tr>
  </thead>
  <tbody>
    {this.state.fList.map((faculty, index) => {
        return (<tr id={"row" + index}>
        <td className="text-center">{index}</td>
        <td className="text-center">{faculty.name}</td>
        {this.state.isHR && 
        
        <th>
            <center>
            <a className="btn btn-primary m-3" onClick={() => {this.onModify(faculty.name)}} role="button">
            Modify
            </a>

            <a className="btn btn-primary btn-danger" role="button" onClick={() => {this.onDeleteFaculty(faculty.name, index)}}>
            Delete
            </a>
            </center>
            
        </th>}
    </tr>
    )
    })}
    
  </tbody>
</Table>
<a className="btn btn-primary btn-success" href="/addfaculty" role="button">
            Add faculty
</a>
      </Container>
    );
  }
}

export default Faculties;
