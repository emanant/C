import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cars from './cars';

export default combineReducers({
  routing,
  cars
});