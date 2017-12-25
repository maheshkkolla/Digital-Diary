import React from "react";
import Formsy from "formsy-react";
import FormsyTextbox from "./FormsyTextbox";
import Footer from "../common/form/Footer";
import FontAwesome from "react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import User from "../../models/User";
import { toast } from 'react-toastify';

export default class Signup extends React.Component {

  constructor() {
    super();
    this.onSignUp = this.onSignUp.bind(this);
    this.onInvalidSubmit = this.onInvalidSubmit.bind(this);
    this.validations = {
        email: "isExisty,isEmail",
        confirmPassword: "isExisty,equalsField:password"
    };

    this.validationsMessages = {
      name: { isDefaultRequiredValue: "Please enter your name" },
      email: { isDefaultRequiredValue: "Please enter your email", isEmail: "Please enter valid email" },
      password: { isDefaultRequiredValue: "Please enter your password"},
      confirmPassword: {isDefaultRequiredValue: "Please confirm your password", 'equalsField:password': "Please enter same password in both the places"}
    }
  }

  onSignUp(model) {
    const user = new User(model);
    this.props.actions.onSignUp(user);
  }

  onInvalidSubmit() {
      let errors = [];
      this.form.inputs.forEach(input => {
          (!input.isValid()) && errors.push(input.getErrorMessage());
      });
      toast.error(errors[0]);
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
      content: this.getSignUpBtnContent()
    };
  }

  render() {
    return(
      <div className="login-widget">
        <Formsy ref={(f) => this.form = f} onValidSubmit={this.onSignUp} onInvalidSubmit={this.onInvalidSubmit}>
          <div className="content">
            <FormsyTextbox type="text" label="Name" name="name" placeholder="Enter your name" validationErrors={this.validationsMessages.name} required/>
            <FormsyTextbox type="text" label="Email" name="email" placeholder="Enter your email" validations={this.validations.email} validationErrors={this.validationsMessages.email} required/>
            <FormsyTextbox type="password" label="Password" name="password" placeholder="Enter your password" validationErrors={this.validationsMessages.password} required/>
            <FormsyTextbox type="password" label="Confirm Password" name="confirm_password" placeholder="Re-Enter your password" validations={this.validations.confirmPassword} validationErrors={this.validationsMessages.confirmPassword} required/>
          </div>
          <Footer noCancel={true} saveBtn={this.getSignUpBtn()} />
        </Formsy>
      </div>
    );
  }
}