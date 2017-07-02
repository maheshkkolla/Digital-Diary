import React from 'react';
import PropTypes from 'prop-types';
// import { Link, IndexLink } from 'react-router';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  componentWillMount() {
    //TODO: Call api to get the user and put it in localstorage
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
