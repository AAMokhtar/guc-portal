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
          <div class="container">
          <div class="row justify-content-center">
              <div class="col-12 col-lg-10 col-xl-8 mx-auto">
                  <div class="my-4">
                     <form>
                          <div class="row mt-5 align-items-center">
                              <div class="col-md-3 text-center mb-5">
                                  <div class="avatar avatar-xl">
                                      <img src="https://lh3.googleusercontent.com/a-/AOh14Gj43WnACEauUzP5IxS3ZyPaNO5CsVmPIZThR-ZKfAg=s288-c-rg-br100" alt="..." class="avatar-img rounded-circle" />
                                  </div>
                              </div>
                              <div class="col">
                                  <div class="row align-items-center">
                                      <div class="col-md-7">
                                          {/*TODO: placeholder. put the name of the current user here!! */}
                                          <h4 class="mb-1">Basant Mounir</h4>
                                          <p class="small mb-3"><span class="badge badge-dark">Cairo ,Egypt</span></p>
                                      </div>
                                  </div>
                                  <div class="row mb-4">
                                      <div class="col-md-7">
                                          <p class="text-muted">
                                              {/*TODO: placeholder. put the role of the current user here!! */}
                                              43- MET CS Student
                                          </p>
                                      </div>
                                      <div class="col">
                                          <p class="small mb-0 text-muted">Cairo, Egypt</p>
                                          <p class="small mb-0 text-muted">Phone Number</p>
                                          <p class="small mb-0 text-muted">Field Placeholder</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <hr class="my-4" />
                         {/** TODO: placeholders all over this page!!!! */}
                          <div class="form-row">
                              <div class="form-group col-md-6">
                                  <label for="firstname">Firstname</label>
                                  <input type="text" id="firstname" class="form-control" placeholder="Your first name" />
                              </div>
                              <div class="form-group col-md-6">
                                  <label for="lastname">Lastname</label>
                                  <input type="text" id="lastname" class="form-control" placeholder="Your last name" />
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="inputEmail4">Email</label>
                              <input type="email" class="form-control" id="inputEmail4" placeholder="Your email" />
                          </div>
                          <div class="form-group">
                              <label for="inputAddress5">Address</label>
                              <input type="text" class="form-control" id="inputAddress5" placeholder="Your address" />
                          </div>
                          <div class="form-row">
                              <div class="form-group col-md-6">
                                  <label for="inputCompany5">Departement</label>
                                  <input type="text" class="form-control" id="inputCompany5" placeholder="Your department" />
                              </div>
                              <div class="form-group col-md-4">
                                  <label for="inputState5">Office </label>
                                  <select id="inputState5" class="form-control">
                                      <option selected="">Office placeholder</option>
                                      <option>...</option>
                                  </select>
                              </div>
                              <div class="form-group col-md-2">
                                  <label for="inputZip5">Other</label>
                                  <input type="text" class="form-control" id="inputZip5" placeholder="Others" />
                              </div>
                          </div>
                          <hr class="my-4" />
                          <div class="row mb-4">
                              <div class="col-md-6">
                                  <div class="form-group">
                                      <label for="inputPassword4">Old Password</label>
                                      <input type="password" class="form-control" id="inputPassword5" />
                                  </div>
                                  <div class="form-group">
                                      <label for="inputPassword5">New Password</label>
                                      <input type="password" class="form-control" id="inputPassword5" />
                                  </div>
                                  <div class="form-group">
                                      <label for="inputPassword6">Confirm Password</label>
                                      <input type="password" class="form-control" id="inputPassword6" />
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <p class="mb-2">Password requirements</p>
                                  <p class="small text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
                                  <ul class="small text-muted pl-4 mb-0">
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
                          <button type="submit" class="btn btn-primary">Save Change</button>
                      </form>
                  </div>
              </div>
          </div>
          
          </div>         );
    }
}
 
export default ViewProfile;