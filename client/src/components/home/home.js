import React, { Component } from 'react';
// import CardUi from './card';
import './section.css';
import { Alert, Col, Image } from 'react-bootstrap';
// import { FcButtingIn } from 'react-icons/fc'



import { Cards } from "../cards/cards";
import { Footer } from "../footer/footer";



class MainComponent extends Component {
    state = {}
    render() {
        let infoArr = [
            {
                
                src: "https://picsum.photos/id/1/500/325",
                title: "My Attendance",
                text: 'View My Attendance record',
                link: '/viewAttendance'
            },
            {
                src: "https://picsum.photos/id/100/500/325",
                title: "My Profile",
                text: 'View and edit my Profile settings',
                link: '/viewProfile'
            },

        ];

        let staffMgmtArr = [
            {
                src: "https://picsum.photos/id/1/500/325",
                title: "New Staff",
                text: 'Add New Staff Member',
                link: '/newStaff'
            },
            {
                src: "https://picsum.photos/id/100/500/325",
                title: "Existing Staff",
                text: 'View Existing Staff Member',
                link: '/viewStaff'
            },
            {
                src: "https://picsum.photos/id/100/500/325",
                title: "Staff Attendance",
                text: 'View current staff Attendance',
                link: '/viewaStaffAttendance'
            },

        ];

        let facMgmt = [
            {
                src: "https://picsum.photos/id/1/500/325",
                title: "Locations",
                text: "View all the available locations",
                link: '/locations'
            },
            {
                src: "https://picsum.photos/id/100/500/325",
                title: "Faculties",
                text: 'View all the available faculties',
                link: '/faculties'
            },


        ];

        return (
            <div>

                <div className="container">
                    <div className="jumbotron mt-4 mb-0">
                        <h1 className="display-4"><span>      <Image style={{ height: 100 }} className='m-3' src="https://lh3.googleusercontent.com/a-/AOh14Gj43WnACEauUzP5IxS3ZyPaNO5CsVmPIZThR-ZKfAg=s288-c-rg-br100" roundedCircle />
                        </span>Welcome Basant Mounir!</h1>

                        <p className="lead">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
                            ipsam, eligendi, in quo sunt possimus non incidunt odit vero
                            aliquid similique quaerat nam nobis illo aspernatur vitae fugiat
                            numquam repellat.
			            </p>
                        <a className="btn btn-primary btn-lg" href="#" role="button">
                            Call to action!
			            </a>
                    </div>
                    <Alert variant='secondary' className='m-3'>
                        My Information
                    </Alert>
                    <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center m-3">
                        {infoArr.map((item, index) => {
                            return (
                                <Col className='d-flex justify-content-center'>
                                <Cards
                                                                    className='h-100'

                                    key={item.link}
                                    src={item.src}
                                    title={item.title}
                                    text={item.text}
                                    link={item.link}                                />
                                </Col>
                            );
                        })}
                    </div>
                    <Alert variant='secondary' className='m-3'>
                        Staff Management
                    </Alert>
                    <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center m-3">
                        {staffMgmtArr.map((item, index) => {
                            return (
                                <Col className='d-flex justify-content-center'>
                                <Cards
                                    className='h-100'
                                    key={item.link}
                                    src={item.src}
                                    title={item.title}
                                    text={item.text}
                                    link={item.link}                                />
                                </Col>
                            );
                        })}
                    </div>
                    <Alert variant='secondary' className='m-3'>
                        Faculty & Facility Management
                    </Alert>
                    <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center m-3">
                        {facMgmt.map((item, index) => {
                            return (
                                <Col className='d-flex justify-content-center'>
                                <Cards
                                                                    className='h-100'

                                    key={item.link}
                                    src={item.src}
                                    title={item.title}
                                    text={item.text}
                                    link={item.link}                                />
                                </Col>
                                
                            );
                        })}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default MainComponent;