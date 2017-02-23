import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import App from './containers/App/App';
import LogIn from './containers/LogIn/LogIn';
import PostsList from './containers/PostsList/PostsList';
import PostCreate from './containers/PostCreate/PostCreate';
import Authorization from './containers/Auth/Auth';
import NoPermissions from './containers/NoPermissions/NoPermissions';
import { checkAuth } from './store/Auth/actions';

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
