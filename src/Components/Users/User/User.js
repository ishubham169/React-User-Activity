import React, { Component } from "react";
import "../../../App.css";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class User extends Component {
  state = {
    showUser: false,
    userName: "",
    userLocation: "",
    userActivity: [],
  };

  render() {
    let data = null;
    let buttons = (
      <div>
        <ButtonGroup>
          <Button
            className="Buttons"
            onClick={this.props.clickHandler}
            variant="secondary"
            size="sm"
          >
            Expand
          </Button>
          <Link
            to={{
              pathname: "/activity",
              state: { userActivity: this.props.userActivity },
            }}
          >
            <Button className="Buttons" variant="warning" size="sm">
              Search Activity
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    );
    let user = (
      <Card style={{ width: "17rem" }}>
        <Card.Header>
          <div className="name">{this.props.userName}</div>
        </Card.Header>
        {buttons}
      </Card>
    );
    if (this.props.showUser) {
      let userActivity = this.props.userActivity.map((activity, index) => {
        return (
          <ListGroup.Item key={index}>
            <p>
              Start time: {activity.start_time} <br /> End time:{" "}
              {activity.end_time}
            </p>
          </ListGroup.Item>
        );
      });
      user = (
        <div>
          {buttons}
          <Card>
            <Card.Header style={{ color: "red" }}>
              <div className="name">{this.props.userName}</div>
            </Card.Header>
            <ListGroup.Item>{userActivity}</ListGroup.Item>
          </Card>
        </div>
      );
    }
    data = (
      <div className="userCard">
        <div> {user} </div>{" "}
      </div>
    );
    return <div className="row sm-lg-md-xs">{data}</div>;
  }
}
export default User;