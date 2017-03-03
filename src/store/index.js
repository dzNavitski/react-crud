import {createStore, combineReducers, applyMiddleware} from 'redux';
import {hashHistory} from 'react-router';
import createSagaMiddleware from 'redux-saga';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import { loadingBarReducer } from 'react-redux-loading-bar'
import authReducer from './Auth/reducers';
import authSagas from './Auth/sagas';
import postsReducer from './Posts/reducers';
import postsSagas from './Posts/sagas';

import {initialStateAuth} from './Auth/initialStates';

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(hashHistory);

const store = createStore(
    combineReducers({
        auth: authReducer,
        posts: postsReducer,
        routing: routerReducer,
        loadingBar: loadingBarReducer
    }),
    getInitialState(),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware, routeMiddleware, loadingBarMiddleware())
    )
);

function getInitialState() {
    const user = localStorage.getItem('user');
    const permissions = localStorage.getItem('permissions');
    const state = {
        auth: initialStateAuth
    };

    if (user) {
        state.auth.user = user;
    }

    if (permissions) {
        state.auth.permissions = permissions;
    }

    return state;
}

function* rootSaga() {
    yield [
        authSagas(),
        postsSagas()
    ]
}

sagaMiddleware.run(rootSaga);

export default store;