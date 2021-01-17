import React, { Component } from 'react';
// import {Carousel, Image, Container, Row, Col, Button} from 'react-bootstrap'
import './some-styling.css'
import { ToastContainer, toast } from "react-toastify";

const axios = require('axios');
axios.defaults.headers.common['auth-token'] = window.sessionStorage.getItem('token');



let resData;

//department?
//faculty?
//courses?


class ViewProfile extends Component {

    state = {
            user: JSON.parse(localStorage.getItem('user')),
            name: (JSON.parse(localStorage.getItem('user'))).name,
            email: (JSON.parse(localStorage.getItem('user'))).email,
            password: (JSON.parse(localStorage.getItem('user'))).password,
            gender: (JSON.parse(localStorage.getItem('user'))).gender,
            officeLocation: (JSON.parse(localStorage.getItem('user'))).officeLocation,
            facultyName: (JSON.parse(localStorage.getItem('user'))).facultyName,
            departmentName: (JSON.parse(localStorage.getItem('user'))).departmentName,
            others: (JSON.parse(localStorage.getItem('user'))).others
    }




  //TODO: Success and fail toast if there's time!
  handleUpdateProfile = (event) => {
    const params = this.state.user.role == 'HR' ?  {
        email: this.state.email,
        password: this.state.password,
        gender: this.state.gender,
        officeLocation: this.state.officeLocation,
        facultyName: this.state.facultyName,
        departmentName: this.state.departmentName
      } : 
      {
        email: this.state.email,
        password: this.state.password,
        gender: this.state.gender,
        officeLocation: this.state.officeLocation,
       
      } ;
    axios
      .put("http://localhost:4000/staff/updateprofile", {
        headers: {
          'auth-token': localStorage.getItem('token') 
        }
      })
      .then(function (response) {
        toast.success("Profile Updated");
        this.handleViewProfile();


      })
      .catch(function (error) {
        // handle error
        toast.error("Profile Update failed");

        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };


  

    
handleViewProfile(event){

    axios.get('http://localhost:4000/staff/myprofile', {headers: {
        'auth-token': localStorage.getItem('token') 
      }
    }
      )
      .then(function (response) {
        // handle success
        console.log("view profile works");
        console.log(response.data);
        resData = response.data;
        localStorage.setItem("user", response.data)
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  handleChange (evt, field) {
    
    this.setState({ [field]: evt.target.value });
  }


    render() { 
        this.handleViewProfile();
        

        return ( 
          <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                  <div className="my-4">
                     <form>
                          <div className="row mt-5 align-items-center">
                              <div className="col-md-3 text-center mb-5">
                                  <div className="avatar avatar-xl">
                                      <img src="https://img.icons8.com/cute-clipart/64/000000/user-male.png" alt="..." className="avatar-img rounded-circle" />
                                  </div>
                              </div>
                              <div className="col">
                                  <div className="row align-items-center">
                                      <div className="col-md-7">
                                          {/*TODO: placeholder. put the name of the current user here!! */}
                                          <h4 className="mb-1">{this.state.user.name}</h4>
                                          <p className="small mb-3"><span className="badge badge-dark">{this.state.user.officeLocation}</span></p>
                                      </div>
                                  </div>
                                  <div className="row mb-4">
                                      <div className="col-md-7">
                                          <p className="text-muted">
                                              {/*TODO: placeholder. put the role of the current user here!! */}
                                              {this.state.user.departmentName}, {this.state.user.facultyName}
                                          </p>
                                      </div>
                                      <div className="col">
                                          <p className="small mb-0 text-muted">{this.state.user.salary} NET</p>
                                          <p className="small mb-0 text-muted">{this.state.user.email}</p>
                                          <p className="small mb-0 text-muted">ID: {this.state.user.staffID}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <hr className="my-4" />
                         {/** TODO: placeholders all over this page!!!! */}
                          <div className="form-row">
                              <div className="form-group col-md-6">
                                  <label htmlFor="name">Name</label>
                                  <input type="text" id="name" className="form-control" placeholder="Your name" value={this.state.name} onChange={(event)=>this.handleChange(event, "name")} />
                              </div>
                              <div className="form-group col-md-6">
                              <label htmlFor="gender">Gender  </label>
                                  <select id="gender" className="form-control" onChange={(event)=>this.handleChange(event, "gender")}>
                                  <option defaultValue={this.state.user.gender}>{this.state.user.gender}</option>
                                  <option value='Male'>Male</option>
                                  <option value='Female'>Female</option>
                                  </select>
                              </div>
                          </div>
                          <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input type="email" className="form-control" id="email" placeholder="Your email" valuw={this.state.user.email} onChange={(event)=>this.handleChange(event, "email")} />
                          </div>
                          <div className="form-group">
                              <label htmlFor="officeLocation">Office Location</label>
                              <input type="text" className="form-control" id="officeLocation" placeholder="Your office location" value={this.state.user.officeLocation} onChange={(event)=>this.handleChange(event, "officeLocation")}/>
                          </div>
                          <div className="form-row">
                              {this.state.user.role == 'HR' ? <div className="form-group col-md-6">
                                  <label htmlFor="departementName">Departement Name</label>
                                  <input type="text" className="form-control" id="departementName" placeholder="Your department" value={this.state.user.departmentName} onChange={(event)=>this.handleChange(event, "departmentName")}/>
                              </div> : <div></div>}
                              {this.state.user.role == 'HR' ? <div className="form-group col-md-4">
                              <label htmlFor="facultyName">Faculty Name</label>
                                  <input type="text" className="form-control" id="facultyName" placeholder="Your faculty" value={this.state.user.facultyName}  onChange={(event)=>this.handleChange(event, "facultyName")}/>
                              </div> : <div></div>}
            
                              <div className="form-group col-md-2">
                                  <label htmlFor="others">Other</label>
                                  <input type="text" className="form-control" id="others" placeholder="Others" value={this.state.others} onChange={(event)=>this.handleChange(event, "others")}/>
                              </div>
                          </div>
                          <hr className="my-4" />
                          <div className="row mb-4">
                              <div className="col-md-6">
                                  {/* <div className="form-group">
                                      <label htmlFor="inputPassword4">Old Password</label>
                                      <input type="password" className="form-control" id="inputPassword5" />
                                  </div> */}
                                  <div className="form-group">
                                      <label htmlFor="password">New Password</label>
                                      <input type="password" className="form-control" id="password" />
                                  </div>
                                  {/* <div className="form-group">
                                      <label htmlFor="password">Confirm Password</label>
                                      <input type="password" className="form-control" id="password" />
                                  </div> */}
                              </div>
                              <div className="col-md-6">
                                  <p className="mb-2">Password requirements</p>
                                  <p className="small text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
                                  <ul className="small text-muted pl-4 mb-0">
                                      <li>Minimum 8 character</li>
                                      <li>At least one special character</li>
                                      <li>At least one number</li>
                                      <li>Can’t be the same as a previous password</li>
                                  </ul>
                              </div>
                          </div>
                          <div>
                            {/* <EditProfile/> */}
                          </div>
                          <button onClick={this.handleUpdateProfile} className="btn btn-primary">Save Change</button>
                      </form>
                  </div>
              </div>
          </div>
          
          </div>         );
    }
}
 
export default ViewProfile;