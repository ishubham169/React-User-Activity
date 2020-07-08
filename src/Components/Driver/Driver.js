import React, {Component} from 'react';
import '../../App.css';
import resp from '../../Response.json';
import User from '../Users/User/User';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

class Driver extends Component{

  state = {
    showUsers: false,
    users: []
  };

  componentDidMount = () => {
    const users = resp.members.map((user) => {
      user['showUser'] = false;
       return user
     });
    this.setState({users: users});
  }

  clickHandler = (userId) => {
    let users = this.state.users;
    const user = users.find((user) => user.id === userId);
    user['showUser'] = !user['showUser'];
    this.setState({users: users});
  }

  toggleUsersHandler = () => {
    this.setState({showUsers: !this.state.showUsers});
  }
 
  render(){
    let users = null;
    if(this.state.showUsers){
      users = this.state.users.map((user, index) => {
        return <ListGroup> 
        <User key = {index}
                     userName={user.real_name} 
                     userLocation={user.tz} 
                     userActivity={user.activity_periods}
                     showUser={user.showUser}
                     userId ={user.id}
                     clickHandler={() => this.clickHandler(user.id)} />
                </ListGroup>
      })
    }

  return (
    <div className="Button">
      <Button variant="primary"
              size="lg"  
              onClick={this.toggleUsersHandler}
              > Toggle Users
      </Button>
        {users}
      </div>
  );
  }
}

export default Driver;
