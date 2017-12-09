import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AddJournalPage from './components/add-journal/AddJournalPage';
// import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
// import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import AuthService from './utils/AuthService';

function redirectIfNotAuthorized() {
 if(!AuthService.isAuthorised()) {
   browserHistory.push('/app');
 }
}

function redirectIfAuthorized() {
 if(AuthService.isAuthorised()) {
   browserHistory.push('/add-journal');
 }
}

export default (
  <Route path="/app" component={App}>
    <IndexRoute component={HomePage} onEnter={redirectIfAuthorized()}/>
    <Route path="add-journal" component={AddJournalPage} onEnter={redirectIfNotAuthorized}/>
    {/*<Route path="fuel-savings" component={FuelSavingsPage}/>*/}
    {/*<Route path="about" component={AboutPage}/>*/}
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
