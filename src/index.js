import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import App from './App';
import LogIn from './containers/LogIn';
import PostsList from './containers/PostsList';
import PostCreate from './containers/PostCreate';

const history = syncHistoryWithStore(hashHistory, store);

function onAppEnter(nextState, replace, cb) {
    serverAuth()
        .then(cb,cb);
}

function serverAuth(authToken) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('authenticated');
        }, 2000)
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/login"  component={LogIn} onEnter={onAppEnter}/>
            <Route onEnter={onAppEnter} component={App}>
                <Route path="/posts"  component={PostsList}/>
                <Route path="/create" component={PostCreate}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
