


import React, { Component, } from 'react';
import * as authService from '../login/authenticationService';
import { Navbar, Nav, Breadcrumb, Button, OverlayTrigger, Tooltip, Card, Popover } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import SideNav, { MenuIcon } from 'react-simple-sidenav';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'


const axios = require('axios');
axios.defaults.headers.common['auth-token'] = localStorage.getItem('token');


class NavComponent extends Component {



  state = {
    showNav: false,
    currentPage: ''
  }

  handleLogout = (event) => {
    event.preventDefault();

    authService.onLogout()
      .then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response.data.msg);
      })
  }

    //TODO: Success and fail toast if there's time!
  handleSignOut = (event) => {
    axios.put('http://localhost:4000/staff/signout')
      .then(function (response) {
        toast.success('Signed Out Successfully')

        console.log("sign out works");
      })
      .catch(function (error) {
        // handle error
        toast.error('Sign out Failed ',error)

        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

 

  //TODO: Success and fail toast if there's time!
  handleSignIn = (event) => {

    axios.put('http://localhost:4000/staff/signin'
    )
      .then(function (response) {
        // handle success
        toast.success('Signed In Successfully')
        console.log("sign in works");
      })
      .catch(function (error) {
        // handle error
        toast.error('Sign In Failed ')

        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }



  render() {

    const navItems = [


      <div>
        <h1 className='text-muted'>My Info</h1>
        <ul className="list-unstyled">
          <li>
            <Link
              onClick={() => {
                this.setState({ currentPage: 'My Attendance' })
              }}
              to="/viewAttendance">
              My Attendance
        </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                this.setState({ currentPage: 'My Schedule' })
              }}
              to="/schedule">
              My Schedule
        </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                this.setState({ currentPage: 'View Profile' })
              }}

              to="/viewProfile">
              My Profile
        </Link>
          </li>
        </ul>



      </div>
      ,
      <div>
        <h1 className='text-muted'>Staff Management</h1>
        <Link
          onClick={() => {
            this.setState({ currentPage: 'New Staff' })
          }}

          to="/newStaff">
          New Staff
      </Link>
        <br></br>
        <Link
          onClick={() => {
            this.setState({ currentPage: 'View Staff' })
          }}

          to="/viewStaff">
          Existing Staff
      </Link>
        <br></br>
        <Link

          onClick={() => {
            this.setState({ currentPage: 'ATT' })
          }}

          to="/att">
          Staff Attendance
      </Link>
      </div>
      ,
      <div>
        <h1 className='text-muted'>Faculty & Facility Management</h1>
        <Link

          onClick={() => {
            this.setState({ currentPage: 'Locations' })
          }}


          to="/locations">
          Locations
    </Link>
        <br></br>
        <Link

          onClick={() => {
            this.setState({ currentPage: 'Faculties' })
          }}

          to="/faculties">
          Faculties
    </Link>
      </div>
      ,





    ];

 

    const handleClick = () => {
      const elem = document.getElementById('sidebar');
      elem.classList.toggle('collapse');
    }


    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Simple tooltip
      </Tooltip>
    );
//TODO: placeholder - replace with role of logged in user
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Basant Mounir</Popover.Title>
        <Popover.Content>
          43- GUC MET - Student and Aspiring Data Scientist &lt;3 ❤
        </Popover.Content>
      </Popover>
    );

    return (
      <React.Fragment>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand onClick={
            () => {
              this.setState({
                showNav: true
              })
            }
          }><Image src="https://lh6.ggpht.com/gNy40q6S_519oQZ_AE9sGypZ-Z94zDy2Xpm5Tg5mYf8yVOSLAxAhEatKLn0vJDyFErE=w300" width="40" height="40" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Link onClick={() => {
                this.setState({ currentPage: 'Home' })
              }} className="nav-link" to='/' style={{color:'#fff'}}>
                  Dashboard
                </Link>
                 <Link className="nav-link" onClick={() => {
                this.setState({ currentPage: 'Edit Profile' })
              }}  to='/editProfile' style={{color:'#fff'}}>
                  Edit Profile
      </Link>
                
                <Link className="nav-link" onClick={() => {
                  this.setState({ currentPage: 'View Profile' })
                }} to='/viewProfile' style={{color:'#fff'}}>
                  View Profile
          </Link>
              {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>*/}
            </Nav>

            <Nav>
              <Nav.Link onClick={this.handleSignIn}>Sign In</Nav.Link>

              {/* display successfully signed out toast */}
              <Nav.Link onClick={this.handleSignOut}>Sign Out</Nav.Link>
              <Nav.Link onClick={this.handleLogout}>Log Out</Nav.Link>
              
              <Nav.Link >

              {/*todo: this is a placeholder. Put name of the current user!*/}
                <OverlayTrigger placement="bottom" overlay={popover}>
                  <Button variant="dark">Basant Mounir</Button>
                </OverlayTrigger>


              </Nav.Link>

              <div className="avatar avatar-xl">
                <img src="https://lh3.googleusercontent.com/a-/AOh14Gj43WnACEauUzP5IxS3ZyPaNO5CsVmPIZThR-ZKfAg=s288-c-rg-br100" style={{ maxHeight: 50, maxWidth: 50 }} alt="..." className="avatar-img rounded-circle" />
              </div>
            </Nav>


          </Navbar.Collapse>
        </Navbar>
        <ToastContainer />
        <Breadcrumb>
        <Link to='/' style={{color:'#000'}}>GUC Portal / </Link>
          <Breadcrumb.Item active>{this.state.currentPage}</Breadcrumb.Item>
        </Breadcrumb>


        <div>
          <MenuIcon onClick={() => {
            this.setState({
              showNav: true
            })
          }} />
          <SideNav
            title='MENU'
            items={navItems}

            showNav={this.state.showNav} onHideNav={() => {
              this.setState({
                showNav: false
              })
            }} />
        </div>
      </React.Fragment>

    );
  }
}

export default NavComponent;