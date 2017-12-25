import React from 'react';
import HomePage from "./HomePage";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as signupActions} from "../../ducks/home/signup.duck";

class LandingPage extends React.Component {

  render() {
    return(
      <HomePage actions={this.props.actions}/>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
     signup: bindActionCreators(signupActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
