import React, {Component} from 'react';
import './User.css';
import { Link } from "react-router-dom";

class User extends Component {

    state = {
        showUser: false,
        userId: "",
        userName: "",
        userLocation: "",
        userActivity: [],
        showCalendar: false
    }

    onMouseEnter(e) {
        e.target.style.background = 'red';
      }
      onMouseLeave(e) {
        e.target.style.background = 'green';
      }
    click = () => {
        this.setState({showCalendar: !this.state.showCalendar})
    }
    
    render() {
        const style = {
            padding: "5px",
            margin: "15px",
            backgroundColor: "green",
            cursor: "pointer",
            textalign: "center"
        }
        let data = null;
        if(this.state.showCalendar){
                data = <Link to="/activity">
                Login
              </Link>
        }
        else{
        let user = <div onClick={this.props.clickHandler}>{this.props.userName}</div>
        if(this.props.showUser){
            let userActivity = this.props.userActivity.map((activity, index) => {
                return <div key={index}><p>{activity.start_time}  {activity.end_time}</p></div>
            });
            user = <div>
                     <div onClick={this.props.clickHandler}>{this.props.userName}</div>
                     <div>{this.props.userLocation}</div>
                     {userActivity}
                     <Link to={{
                            pathname: '/activity',
                            state: {
                                userActivity: this.props.userActivity
                            }
                            }}>Show Activity</Link>
                   </div>
        }
            data = <div style={style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                           {user}
                   </div>
        }
        return(
            <div>{data}</div>  
        );
    };
}
export default User;