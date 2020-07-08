import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class CalendarInput extends Component {

  constructor (props) {
    super(props);
    const userActivity = this.props.location.state.userActivity.map((activity) => {
      let start_time = activity['start_time'];
      let end_time = activity['end_time'];
      const start = new Date(start_time.slice(0, start_time.length - 2));
      const end = new Date(end_time.slice(0, end_time.length - 2));
      activity['start_time_epoch'] = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0).getTime();
      activity['end_time_epoch'] = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0).getTime();
      return activity
    });
    this.state = {
      startDate: new Date(),
      userActivity: userActivity,
      showActivity: this.dateSelectedHandler(new Date(), userActivity)
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
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
      if(activity.start_time_epoch <= selectedTime && activity.end_time_epoch >= selectedTime){
        matchingActivity.push(activity);
      }return [];
    });
    const style={
      color: "red"
    }
    const showActivity = matchingActivity.map((activity, index) => {
      return <div style={style} key={index}>{activity.start_time} {activity.end_time}</div>
    });
    console.log(matchingActivity);
    if (showActivity.length){
      return showActivity;
      }
      else{
        return <div style={style}>No Activity on these Dates</div>
      }
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.setState({showActivity: this.dateSelectedHandler(this.state.startDate, this.state.userActivity)});
    
  }
 
  render() {

    return (
      <div>
      <form onSubmit={ this.onFormSubmit }>
        <div className="form-group">
          <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name="startDate"
              dateFormat="MM/dd/yyyy"
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </form>
      {this.state.showActivity}
      </div>
    );
  }
  
}

export default CalendarInput;