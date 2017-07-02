import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {browserHistory} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AddJournalPage from './components/add-journal/AddJournalPage';
// import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
// import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import AuthService from './utils/AuthService';

function redirectIfNotAuthorized() {
 if(!AuthService.isAuthorised()) {
   browserHistory.push('/');
 }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="add-journal" component={AddJournalPage} onEnter={redirectIfNotAuthorized}/>
    {/*<Route path="fuel-savings" component={FuelSavingsPage}/>*/}
    {/*<Route path="about" component={AboutPage}/>*/}
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
