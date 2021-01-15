import React, { Component } from "react";
import { Container, Jumbotron , Table} from "react-bootstrap";
import * as courseService from "../components/courses/courseService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import getHistory from "../index"

class Courses extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
        cList: [],
        user: JSON.parse(localStorage.getItem("user")),
        isHR: false
    };

    this.onDeleteCourse = this.onDeleteCourse.bind(this);
    this.onModify = this.onModify.bind(this);

  }


  componentDidMount() {

    this.setState({
        isHR: this.state.user.role == "HR"
    })
    //get all Courses
    courseService.getCourses().then((res) => {
      this.setState({ cList: res });
    })
    .catch(err => {
        toast.error("failed to load Courses");
    });
  }

  onRemoveCourse(index){
    courseService.removeCourse(this.state.cList[index].department, this.state.cList[index].courseCode)
    .then(res => {
        this.state.cList[index].department = "-";
        this.setState({
            cList: this.state.cList
        });

        toast.success(res);
    })
    .catch(err => {
        if(err.response.data.msg)
            toast.error(err.response.data.msg);
        else
            toast.error(err.response.data);
    });
  };

  onDeleteCourse(courseCode, index){
    courseService.deleteCourse(courseCode)
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

  onModify(department, courseCode){
    getHistory().push({
        pathname: "/updateCourse",
        state: { oldname: courseCode, department: department }
    })
  }


  render() {
    return (
      <Container>
        <Jumbotron>
          <Container>
            <h1>Courses</h1>
            <p>
              On this page, you can view all the available Courses.
            </p>
          </Container>
        </Jumbotron>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Course code</th>
      <th>Department name</th>
      {this.state.isHR && <th>Actions</th>}
    </tr>
  </thead>
  <tbody>
    {this.state.cList.map((Course, index) => {
        return (<tr id={"row" + index}>
        <td className="text-center">{index}</td>
        <td className="text-center">{Course.courseCode}</td>
        <td className="text-center">{Course.department?Course.department:"-"}</td>
        {this.state.isHR && 
        
        <th>
            <center>
            <a className="btn btn-primary m-3" onClick={() => {this.onModify(Course.department, Course.courseCode)}} role="button">
            Modify
            </a>

            <a className="btn btn-primary btn-danger m-3" role="button" onClick={() => {this.onRemoveCourse(index)}}>
            Remove from department
            </a>

            <a className="btn btn-primary btn-danger" role="button" onClick={() => {this.onDeleteCourse(Course.courseCode, index)}}>
            Delete
            </a>
            </center>
            
        </th>}
    </tr>
    )
    })}
    
  </tbody>
</Table>
{ this.state.isHR &&
(<a className="btn btn-primary btn-success" href="/addfaculty" role="button"> Add course under department</a>)}
      </Container>
    );
  }
}

export default Courses;
