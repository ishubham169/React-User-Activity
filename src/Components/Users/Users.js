import React, {Component} from 'react';
import User from './User/User';

class Users extends Component {

    render(){
        const users = this.props.users.map((user, index) => {
            return <User 
                        key={index}
                        userName={user.real_name} 
                        userLocation={user.tz} 
                        userActivity={user.activity_periods}
                        showUser={user.showUser}
                        userId ={user.userId}
                        onclick={this.props.click}/> 
        });
        return (
            <div>
                {users}
            </div>
        );
    }
}
export default Users;