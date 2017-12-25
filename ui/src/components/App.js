/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import LandingPage from "../components/home/LandingPage";
import NotFoundPage from './NotFoundPage';
import { ToastContainer} from 'react-toastify';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <ToastContainer/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
