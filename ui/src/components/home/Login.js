import React from "react";
import Formsy from "formsy-react";
import FormsyTextbox from "./FormsyTextbox";
import FontAwesome from "react-fontawesome";
import Footer from "../common/form/Footer";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default class Login extends React.Component {

  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {

  }

  getLoginBtnContent() {
    return(
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Login </Tooltip>}>
        <span><FontAwesome name="sign-in"/></span>
      </OverlayTrigger>
    );
  }

  getLoginBtn() {
    return {
      content: this.getLoginBtnContent(),
      onClick: this.onLogin
    };
  }

  render() {
    return(
      <div className="login-widget">
        <div className="content">
          <Formsy ref={(f) => this.form = f}>
            <FormsyTextbox type="text" label="Email" name="name" placeholder="Enter your email"/>
            <FormsyTextbox type="password" label="Password" name="password" placeholder="Enter your password"/>
          </Formsy>
        </div>
        <Footer noCancel={true} saveBtn={this.getLoginBtn()}/>
      </div>
    );
  }
}