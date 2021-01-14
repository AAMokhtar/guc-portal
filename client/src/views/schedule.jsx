import React, { Component } from "react";

import "./schedule.css";
class Schedule extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  state = { schedule: [] };
  handleClick(day) {
    if (day) {
      console.log(this.props);

      let schedule = this.props.schedule.schedule;
      let cur = schedule[day.toLowerCase()];
      if (cur) {
        let data = [];
        Object.keys(cur).map((currentSlot) => {
          let currentSlotValue = cur[currentSlot];
          data.push(
            <div className="col-md-6">
              <div className="timetable-item">
                <div className="timetable-item-img">
                  <img
                    src="https://via.placeholder.com/100x80/FFB6C1/000000"
                    alt="CS4"
                  />
                </div>
                <div className="timetable-item-main">
                  <div className="timetable-item-time">{currentSlot}</div>
                  <div className="timetable-item-name">
                    {currentSlotValue == "free"
                      ? "free"
                      : currentSlotValue.course}
                  </div>
                  <div className="timetable-item-like">
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <div className="timetable-item-like-count">11</div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
        this.setState({ schedule: data });
      }
    }
  }
  render() {
    return (
      <div className="idance">
        <div className="schedule content-block">
          <div className="container">
            <h2 data-aos="zoom-in-up" className="aos-init aos-animate">
              Schedule
            </h2>

            <div className="timetable">
              <nav className="nav nav-tabs">
                <a
                  className="nav-link active"
                  onClick={() => this.handleClick("mon")}
                >
                  Mon
                </a>
                <a className="nav-link" onClick={() => this.handleClick("tue")}>
                  Tue
                </a>
                <a className="nav-link" onClick={() => this.handleClick("wed")}>
                  Wed
                </a>
                <a className="nav-link" onClick={() => this.handleClick("thu")}>
                  Thu
                </a>
                <a className="nav-link" onClick={() => this.handleClick("fri")}>
                  Fri
                </a>
                <a className="nav-link" onClick={() => this.handleClick("sat")}>
                  Sat
                </a>
                <a className="nav-link" onClick={() => this.handleClick("sun")}>
                  Sun
                </a>
              </nav>

              <div className="tab-content">
                <div className="tab-pane show active">
                  <div className="row"></div>
                  {this.state.schedule}
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
