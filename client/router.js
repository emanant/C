import React from 'react';
import {
  Route,
  Router,
  IndexRoute,
  Link
} from 'react-router';
import Login from './login';
import App from './App';
import Cars from './Cars';
import { Provider } from 'react-redux';

const createRoutes = (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component = {App}>
        <IndexRoute component={Login}/>
        <Route path="/cars" component={Cars}/>
      </Route>
    </Router>
  </Provider>
)
export default createRoutes;
