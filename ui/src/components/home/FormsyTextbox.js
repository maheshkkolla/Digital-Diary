import React from "react";
import {withFormsy} from 'formsy-react';
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import "./formsyTextbox.scss";

class FormsyTextbox extends React.Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.setValue(this.props.value);
  }

  onChange(e) {
    this.props.setValue(e.target.value);
    this.props.onChange && this.props.onChange(e);
  }

  render() {
    return(
      <FormGroup className="field">
        <ControlLabel className="label">{this.props.label}</ControlLabel>
        <FormControl className="value" type={this.props.type} value={this.props.getValue()} placeholder={this.props.placeholder} onChange={this.onChange}/>
      </FormGroup>
    );
  }
}

export default withFormsy(FormsyTextbox);