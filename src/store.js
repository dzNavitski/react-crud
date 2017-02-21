import { createStore, combineReducers, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import postsRoot from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(hashHistory);

const store = createStore(
    combineReducers({
        postsRoot,
        routing: routerReducer
    }),
    getPreloadedState(),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware, routeMiddleware)
    )
);

function getPreloadedState() {
    const user = localStorage.getItem('user');
    const permissions = localStorage.getItem('permissions');
    const state = {
        postsRoot: {
            auth: {
                user: null,
                permissions: null
            }
        }
    };

    if (user) {
        state.postsRoot.auth.user = user;
    }

    if (permissions) {
        state.postsRoot.auth.permissions = permissions;
    }

    return state;
}

sagaMiddleware.run(rootSaga);

export default store;