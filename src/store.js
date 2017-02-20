import { createStore, combineReducers, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import postsRoot from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(hashHistory);

const store = createStore(
    combineReducers({
        postsRoot,
        routing: routerReducer
    }),
    applyMiddleware(sagaMiddleware, routeMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;