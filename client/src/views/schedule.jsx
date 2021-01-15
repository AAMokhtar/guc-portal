import React, { Component } from "react";
import "./schedule.css";

class Schedule extends Component {
  state = {
    arr: [
      {
        day: "mon",
        active: false,
      },
      {
        day: "tue",
        active: false,
      },
      {
        day: "wed",
        active: false,
      },
      {
        day: "thu",
        active: false,
      },
      {
        day: "fri",
        active: false,
      },
      {
        day: "sat",
        active: false,
      },
      {
        day: "sun",
        active: false,
      },
    ],
    schedule: [],
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(day) {
    if (day != null) {
      let tmp = this.state.arr;
      tmp[day].active = true;
      for (let i = 0; i < tmp.length; i++) {
        if (i == day) tmp[day].active = true;
        else tmp[i].active = false;
      }
      this.setState({
        arr: tmp,
      });
      let schedule = this.props.location.state;
      console.log(schedule);
      let cur;
      if (day == 4)
        cur = {
          first: "Free",
          second: "Free",
          third: "Free",
          fourth: "Free",
          fifth: "Free",
        };
      else cur = schedule[this.state.arr[day].day.toLowerCase()];
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
                    {currentSlotValue === "Free"
                      ? currentSlotValue
                      : currentSlotValue.course.courseCode}
                  </div>{" "}
                  <div className="timetable-item-name">
                    {currentSlotValue === "Free"
                      ? ""
                      : currentSlotValue.location
                      ? currentSlotValue.location.name
                      : ""}
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
                  className={
                    this.state.arr[0].active == true
                      ? "nav-link text-primary active"
                      : "nav-link"
                  }
                  onClick={() => this.handleClick(0)}
                >
                  Mon
                </a>
                <a
                  className={
                    this.state.arr[1].active == true
                      ? "nav-link text-primary active"
                      : "nav-link"
                  }
                  onClick={() => this.handleClick(1)}
                >
                  Tue
                </a>
                <a
                  className={
                    this.state.arr[2].active == true
                      ? "nav-link text-primary active"
                      : "nav-link"
                  }
                  onClick={() => this.handleClick(2)}
                >
                  Wed
                </a>
                <a
                  className={
                    this.state.arr[3].active == true
                      ? "nav-link text-primary active"
                      : "nav-link"
                  }
                  onClick={() => this.handleClick(3)}
                >
                  Thu
                </a>
                <a
                  className={
                    this.state.arr[4].active == true
                      ? "nav-link text-primary active"
                      : "nav-link"
                  }
                  onClick={() => this.handleClick(4)}
                >
                  Fri
                </a>
                <a
                  className={
                    this.state.arr[5].active == true
                      ? "nav-link text-primary active"
                      : "nav-link"
                  }
                  onClick={() => this.handleClick(5)}
                >
                  Sat
                </a>
                <a
                  className={
                    this.state.arr[6].active == true
                      ? "nav-link text-primary active"
                      : "nav-link"
                  }
                  onClick={() => this.handleClick(6)}
                >
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
