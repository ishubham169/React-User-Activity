import React, {Component} from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class User extends Component {

    state = {
        showUser: false,
        userName: "",
        userLocation: "",
        userActivity: []
    }
    
    render() {
        let data = null;
        let buttons = <div>
            <ButtonGroup>
                <Button onClick={this.props.clickHandler}  variant="primary" size="sm">Expand</Button>
                <Link to={{pathname: '/activity', state: {userActivity: this.props.userActivity}}}>
                    <Button variant="primary" size="sm">Search Activity</Button>
                </Link>
            </ButtonGroup>
        </div>
        let user = <div>
            {buttons}
            <Card style={{color: "red"}} >
                <Card.Header> {this.props.userName}</Card.Header>
            </Card>
        </div>
        if(this.props.showUser){
            let userActivity = this.props.userActivity.map((activity, index) => {
                        return (<ListGroup.Item key={index}><p>Start time: {activity.start_time} End time: {activity.end_time}
                                </p></ListGroup.Item>)
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
        }    
        data = <Card className="userCard"><div> {user} </div> </Card>
        return(
            <div>{data}</div>  
        );
    };
}
export default User;