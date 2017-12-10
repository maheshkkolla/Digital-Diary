import React from "react";
import Formsy from "formsy-react";
import FormsyTextbox from "./FormsyTextbox";
import Footer from "../common/form/Footer";
import FontAwesome from "react-fontawesome";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default class Signup extends React.Component {

  constructor() {
    super();
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {

  }

  getSignUpBtnContent() {
    return(
      <OverlayTrigger placement="bottom" overlay={<Tooltip> Sign Up </Tooltip>}>
        <span><FontAwesome name="user-plus"/></span>
      </OverlayTrigger>
    );
  }

  getSignUpBtn() {
    return {
      content: this.getSignUpBtnContent(),
      onClick: this.onSignUp
    };
  }

  render() {
    return(
      <div className="login-widget">
        <div className="content">
          <Formsy ref={(f) => this.form = f}>
            <FormsyTextbox type="text" label="Name" name="name" placeholder="Enter your name"/>
            <FormsyTextbox type="text" label="Email" name="name" placeholder="Enter your email"/>
            <FormsyTextbox type="password" label="Password" name="password" placeholder="Enter your password"/>
            <FormsyTextbox type="password" label="Confirm Password" name="confirm_password" placeholder="Re-Enter your password"/>
          </Formsy>
        </div>
        <Footer noCancel={true} saveBtn={this.getSignUpBtn()} />
      </div>
    );
  }
}