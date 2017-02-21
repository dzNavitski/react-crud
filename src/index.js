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
import Authorization from './containers/Auth';
import NoPermissions from './containers/NoPermissions';
import { checkAuth } from './actions';

const history = syncHistoryWithStore(hashHistory, store);

function onAppEnter(nextState, replace, next) {
    store.dispatch(checkAuth(nextState.routes[1].permissions, next));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/login"  component={LogIn}/>
            <Route path="/nopermissions"  component={NoPermissions}/>
            <Route path="/" component={App}>
                <Route onEnter={onAppEnter} permissions={[1, 2, 3]} path="/posts"  component={PostsList}/>
                <Route path="/create" component={Authorization(PostCreate, [1,2,3])}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
