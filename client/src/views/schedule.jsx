import React, { Component } from 'react';

import './schedule.css'
class Schedule extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="idance">
    <div className="schedule content-block">
        <div className="container">
            <h2 data-aos="zoom-in-up" className="aos-init aos-animate">Schedule</h2>
        
            <div className="timetable">
        
              
              <nav className="nav nav-tabs">
                <a className="nav-link active">Mon</a>
                <a className="nav-link">Tue</a>
                <a className="nav-link">Wed</a>
                <a className="nav-link">Thu</a>
                <a className="nav-link">Fri</a>
                <a className="nav-link">Sat</a>
                <a className="nav-link">Sun</a>
              </nav>
        
              <div className="tab-content">
                <div className="tab-pane show active">
                  <div className="row">
        
                    
                    <div className="col-md-6">
                      <div className="timetable-item">
                        <div className="timetable-item-img">
                          <img src="https://via.placeholder.com/100x80/FFB6C1/000000" alt="CS4"/>
                        </div>
                        <div className="timetable-item-main">
                          <div className="timetable-item-time">4:00pm - 5:00pm</div>
                          <div className="timetable-item-name">CS4</div>
                          <div className="timetable-item-like">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <div className="timetable-item-like-count">11</div>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    
                    <div className="col-md-6">
                      <div className="timetable-item">
                        <div className="timetable-item-img">
                          <img src="https://via.placeholder.com/100x80/00FFFF/000000" alt="CA"/>
                        </div>
                        <div className="timetable-item-main">
                          <div className="timetable-item-time">5:00pm - 6:00pm</div>
                          <div className="timetable-item-name">CA</div>
                          <div className="timetable-item-like">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <div className="timetable-item-like-count">28</div>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    
                    <div className="col-md-6">
                      <div className="timetable-item">
                        <div className="timetable-item-img">
                          <img src="https://via.placeholder.com/100x80/8A2BE2/000000" alt="DMET"/>
                        </div>
                        <div className="timetable-item-main">
                          <div className="timetable-item-time">5:00pm - 6:00pm</div>
                          <div className="timetable-item-name">DMET</div>
                          <div className="timetable-item-like">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <div className="timetable-item-like-count">28</div>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    
                    <div className="col-md-6">
                      <div className="timetable-item">
                        <div className="timetable-item-img">
                          <img src="https://via.placeholder.com/100x80/6495ED/000000" alt="ACML"/>
                        </div>
                        <div className="timetable-item-main">
                          <div className="timetable-item-time">7:00pm - 8:00pm</div>
                          <div className="timetable-item-name">ACL</div>
                          <div className="timetable-item-like">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <div className="timetable-item-like-count">23</div>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    
                    <div className="col-md-6">
                      <div className="timetable-item">
                        <div className="timetable-item-img">
                          <img src="https://via.placeholder.com/100x80/00FFFF/000000" alt="IOT"/>
                        </div>
                        <div className="timetable-item-main">
                          <div className="timetable-item-time">6:00pm - 7:00pm</div>
                          <div className="timetable-item-name">IOT</div>
                          <div className="timetable-item-like">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <div className="timetable-item-like-count">14</div>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    
                    <div className="col-md-6">
                      <div className="timetable-item">
                        <div className="timetable-item-img">
                          <img src="https://via.placeholder.com/100x80/008B8B/000000" alt="Machine Learning"/>
                        </div>
                        <div className="timetable-item-main">
                          <div className="timetable-item-time">8:00pm - 9:00pm</div>
                          <div className="timetable-item-name">Machine Learning</div>
                          <div className="timetable-item-like">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <div className="timetable-item-like-count">9</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>

         );
    }
}
 
export default Schedule;