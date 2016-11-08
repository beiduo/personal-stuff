import './lib/rxjs-extentions';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


import configureStore from './store/configureStore';

import App from './containers/App';
import Todo from './containers/Todo';
import Completed from './containers/Completed';
import Create from './containers/Create';

import './style.css';

const store = configureStore();
const root = document.getElementById('root');

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


render((
    <Provider store={store}>
        <Router history={history}>
            <route path="/" component={App}>
                <IndexRedirect to="/todo" />
                <route path="todo" component={Todo} />
                <route path="completed" component={Completed} />
                <route path="create" component={Create} />
            </route>
        </Router>
    </Provider>
), root);
