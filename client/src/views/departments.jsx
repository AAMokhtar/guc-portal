import React, { Component } from "react";
import { Container, Jumbotron, Table } from "react-bootstrap";
import * as departmentService from "../components/departments/departmentService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getHistory from "../index";

class Departments extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      dList: [],
      user: JSON.parse(localStorage.getItem("user")),
      isHR: false,
    };

    this.onDeleteDepartment = this.onDeleteDepartment.bind(this);
    this.onModify = this.onModify.bind(this);
  }

  componentDidMount() {
    this.setState({
      isHR: this.state.user.role == "HR",
    });
    //get all Departments
    departmentService
      .getDepartments()
      .then((res) => {
        this.setState({ dList: res });
      })
      .catch((err) => {
        toast.error("failed to load Departments");
      });
  }

  onRemoveDepartment(index) {
    departmentService
      .removeDepartment(
        this.state.dList[index].name,
        this.state.dList[index].faculty
      )
      .then((res) => {
        this.state.dList[index].faculty = "-";
        this.setState({
          dList: this.state.dList,
        });

        toast.success(res);
      })
      .catch((err) => {
        if (err.response.data.msg) toast.error(err.response.data.msg);
        else toast.error(err.response.data);
      });
  }

  onDeleteDepartment(Department, index) {
    departmentService
      .deleteDepartment(Department)
      .then((res) => {
        var elem = document.getElementById("row" + index);
        elem.parentNode.removeChild(elem);

        toast.success(res);
      })
      .catch((err) => {
        if (err.response.data.msg) toast.error(err.response.data.msg);
        else toast.error(err.response.data);
      });
  }

  onModify(Department, faculty) {
    getHistory().push({
      pathname: "/updateDepartment",
      state: { oldname: Department, faculty: faculty },
    });
  }

  render() {
    return (
      <Container>
        <Jumbotron>
          <Container>
            <h1>Departments</h1>
            <p>On this page, you can view all the available Departments.</p>
          </Container>
        </Jumbotron>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Department name</th>
              <th>Faculty name</th>
              <th>Head of department(HOD) ID</th>
              {this.state.isHR && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {this.state.dList.map((Department, index) => {
              return (
                <tr id={"row" + index}>
                  <td className="text-center">{index}</td>
                  <td className="text-center">{Department.name}</td>
                  <td className="text-center">
                    {Department.faculty ? Department.faculty : "-"}
                  </td>
                  <td className="text-center">
                    {Department.hodStaffID ? Department.hodStaffID : "-"}
                  </td>
                  {this.state.isHR && (
                    <th>
                      <center>
                        <a
                          className="btn btn-primary m-3"
                          onClick={() => {
                            this.onModify(Department.name, Department.faculty);
                          }}
                          role="button"
                        >
                          Modify
                        </a>

                        <a
                          className="btn btn-primary btn-danger m-3"
                          role="button"
                          onClick={() => {
                            this.onRemoveDepartment(index);
                          }}
                        >
                          Remove from faculty
                        </a>

                        <a
                          className="btn btn-primary btn-danger"
                          role="button"
                          onClick={() => {
                            this.onDeleteDepartment(Department.name, index);
                          }}
                        >
                          Delete
                        </a>
                      </center>
                    </th>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {this.state.isHR && (
          <a
            className="btn btn-primary btn-success"
            href="/addDepartment"
            role="button"
          >
            {" "}
            Add department under faculty
          </a>
        )}
      </Container>
    );
  }
}

export default Departments;
