import React from "react";
import {Tabs, Tab} from "react-bootstrap";
import "./loginSignUpWidget.scss";
import Login from "./Login";
import Signup from "./Signup";


export default class LoginSignUpWidget extends React.Component {
  render() {
    return(
      <Tabs defaultActiveKey={1} className="login-signup-widget">
        <Tab eventKey={1} title="Login">
          <Login />
        </Tab>
        <Tab eventKey={2} title="Sign Up">
          <Signup />
        </Tab>
      </Tabs>
    );
  }
}