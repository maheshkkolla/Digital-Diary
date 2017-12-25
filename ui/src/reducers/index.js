import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import { routerReducer } from 'react-router-redux';
import {reducer as signup} from "../ducks/home/signup.duck";

const rootReducer = combineReducers({
  fuelSavings,
  routing: routerReducer,
  signup
});

export default rootReducer;
