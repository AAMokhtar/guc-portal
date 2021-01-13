import React, { Component } from 'react';
// import {Carousel, Image, Container, Row, Col, Button} from 'react-bootstrap'
import './some-styling.css'
const axios = require('axios');
axios.defaults.headers.common['auth-token'] = localStorage.getItem('token');



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

        return ( 
          <div className="container">
          <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                  <div className="my-4">
                     <form>
                          <div className="row mt-5 align-items-center">
                              <div className="col-md-3 text-center mb-5">
                                  <div className="avatar avatar-xl">
                                      <img src="https://lh3.googleusercontent.com/a-/AOh14Gj43WnACEauUzP5IxS3ZyPaNO5CsVmPIZThR-ZKfAg=s288-c-rg-br100" alt="..." className="avatar-img rounded-circle" />
                                  </div>
                              </div>
                              <div className="col">
                                  <div className="row align-items-center">
                                      <div className="col-md-7">
                                          {/*TODO: placeholder. put the name of the current user here!! */}
                                          <h4 className="mb-1">Basant Mounir</h4>
                                          <p className="small mb-3"><span className="badge badge-dark">Cairo ,Egypt</span></p>
                                      </div>
                                  </div>
                                  <div className="row mb-4">
                                      <div className="col-md-7">
                                          <p className="text-muted">
                                              {/*TODO: placeholder. put the role of the current user here!! */}
                                              43- MET CS Student
                                          </p>
                                      </div>
                                      <div className="col">
                                          <p className="small mb-0 text-muted">Cairo, Egypt</p>
                                          <p className="small mb-0 text-muted">Phone Number</p>
                                          <p className="small mb-0 text-muted">Field Placeholder</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <hr className="my-4" />
                         {/** TODO: placeholders all over this page!!!! */}
                          <div className="form-row">
                              <div className="form-group col-md-6">
                                  <label htmlFor="firstname">Firstname</label>
                                  <input type="text" id="firstname" className="form-control" placeholder="Your first name" />
                              </div>
                              <div className="form-group col-md-6">
                                  <label htmlFor="lastname">Lastname</label>
                                  <input type="text" id="lastname" className="form-control" placeholder="Your last name" />
                              </div>
                          </div>
                          <div className="form-group">
                              <label htmlFor="inputEmail4">Email</label>
                              <input type="email" className="form-control" id="inputEmail4" placeholder="Your email" />
                          </div>
                          <div className="form-group">
                              <label htmlFor="inputAddress5">Address</label>
                              <input type="text" className="form-control" id="inputAddress5" placeholder="Your address" />
                          </div>
                          <div className="form-row">
                              <div className="form-group col-md-6">
                                  <label htmlFor="inputCompany5">Departement</label>
                                  <input type="text" className="form-control" id="inputCompany5" placeholder="Your department" />
                              </div>
                              <div className="form-group col-md-4">
                                  <label htmlFor="inputState5">Office </label>
                                  <select id="inputState5" className="form-control">
                                      <option defaultValue="">Office placeholder</option>
                                      <option>...</option>
                                  </select>
                              </div>
                              <div className="form-group col-md-2">
                                  <label htmlFor="inputZip5">Other</label>
                                  <input type="text" className="form-control" id="inputZip5" placeholder="Others" />
                              </div>
                          </div>
                          <hr className="my-4" />
                          <div className="row mb-4">
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label htmlFor="inputPassword4">Old Password</label>
                                      <input type="password" className="form-control" id="inputPassword5" />
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="inputPassword5">New Password</label>
                                      <input type="password" className="form-control" id="inputPassword5" />
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="inputPassword6">Confirm Password</label>
                                      <input type="password" className="form-control" id="inputPassword6" />
                                  </div>
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
                          <button type="submit" className="btn btn-primary">Save Change</button>
                      </form>
                  </div>
              </div>
          </div>
          
          </div>         );
    }
}
 
export default ViewProfile;