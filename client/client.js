import { Provider } from 'react-redux';
import createRoutes from './router.js';
import React from 'react';
import ReactDOM from 'react-dom';

import {Router, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';

const store = configureStore({}, browserHistory);
const history =syncHistoryWithStore(browserHistory, store);
const App = createRoutes(store, history);

ReactDOM.render(App, document.getElementById("app"));