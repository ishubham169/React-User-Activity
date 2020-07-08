import React, {Component} from 'react';
import './User.css';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class User extends Component {

    state = {
        showUser: false,
        userId: "",
        userName: "",
        userLocation: "",
        userActivity: []
    }

    onMouseEnter(e) {
        e.target.style.background = 'red';
      }
      onMouseLeave(e) {
        e.target.style.background = 'green';
      }
    
    render() {
        const style = {
            padding: "5px",
            margin: "15px",
            backgroundColor: "white",
            cursor: "pointer",
            textalign: "center"
        }
        let data = null;
        let buttons = <div>
            <Button onClick={this.props.clickHandler}  variant="primary" size="sm">Expand</Button>
            <Link to={{pathname: '/activity', state: {userActivity: this.props.userActivity}}}><Button variant="primary" size="sm">Search Activity</Button></Link>
        </div>
        let user = <div>
            {buttons}
        <Card style={{color: "red"}} >
            <Card.Header> 
                {this.props.userName}
                </Card.Header>
            </Card></div>
        if(this.props.showUser){
            let userActivity = this.props.userActivity.map((activity, index) => {
                return <ListGroup.Item key={index}><p>Start time: {activity.start_time} End time: {activity.end_time}</p></ListGroup.Item>
            });
            user = <div>
                {buttons}
                <Card>
                     <ListGroup.Item style={{color: "red"}}>
                     {this.props.userName}</ListGroup.Item>
                     <ListGroup.Item>{this.props.userLocation}</ListGroup.Item>
                     {userActivity}
                   </Card>
                   </div>
        }    data = <Card style={style}>
                           <div>
                           {user}
                           </div>
                   </Card>
        
        return(
            <div>{data}</div>  
        );
    };
}
export default User;