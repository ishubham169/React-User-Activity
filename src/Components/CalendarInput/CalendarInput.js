import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

class CalendarInput extends Component {
  constructor(props) {
    super(props);
    const userActivity = this.props.location.state.userActivity.map(
      (activity) => {
        let start_time = activity["start_time"];
        let end_time = activity["end_time"];
        const start = new Date(start_time.slice(0, start_time.length - 2));
        const end = new Date(end_time.slice(0, end_time.length - 2));
        activity["start_time_epoch"] = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          0,
          0,
          0
        ).getTime();
        activity["end_time_epoch"] = new Date(
          end.getFullYear(),
          end.getMonth(),
          end.getDate(),
          0,
          0,
          0
        ).getTime();
        return activity;
      }
    );
    this.state = {
      startDate: new Date(),
      userActivity: userActivity,
      showActivity: this.dateSelectedHandler(new Date(), userActivity),
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  dateSelectedHandler = (selectedDate, userActivity) => {
    selectedDate = new Date(selectedDate);
    selectedDate.setSeconds(0);
    selectedDate.setMinutes(0);
    selectedDate.setHours(0);
    const selectedTime = selectedDate.getTime();
    const matchingActivity = [];
    userActivity.map((activity) => {
      if (
        activity.start_time_epoch <= selectedTime &&
        activity.end_time_epoch >= selectedTime
      ) {
        matchingActivity.push(activity);
      }
      return [];
    });

    const showActivity = matchingActivity.map((activity, index) => {
      return (
        <ListGroup.Item key={index}>
          <p>
            Start time: {activity.start_time} End time: {activity.end_time}
          </p>
        </ListGroup.Item>
      );
    });
    if (showActivity.length) {
      return (
        <Card className="card" style={{ width: "39rem" }}>
          {showActivity}
        </Card>
      );
    } else {
      return (
        <Card className="card" style={{ width: "18rem" }}>
          No Activity on these Dates
        </Card>
      );
    }
  };
  searchHandler(e) {
    e.preventDefault();
    setTimeout(() => {
      this.setState({
        showActivity: this.dateSelectedHandler(
          this.state.startDate,
          this.state.userActivity
        ),
      });
    }, 500);
    this.setState({
      showActivity: <Spinner animation="border" variant="danger" />,
    });
  }

  render() {
    return (
      <div class="text-center" style={{ padding: "100px" }}>
        <div class="text-center">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            name="startDate"
            calendarClassName="rasta-stripes"
            todayButton="Today"
            showMonthDropdown
            showYearDropdown
            dateFormat="MM/dd/yyyy"
          />
          <button className="btn btn-primary" onClick={this.searchHandler}>
            Search
          </button>
        </div>
        <br />
        {this.state.showActivity}
      </div>
    );
  }
}

export default CalendarInput;