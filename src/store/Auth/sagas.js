import {takeEvery} from 'redux-saga';
import {put, call, select, fork} from 'redux-saga/effects';
import {push, replace} from 'react-router-redux';
import {setUser, setPermissions} from './actions';

import constants from './constanst';

const getUser = state => state.auth.user;
const getPermissions = state => state.auth.permissions;
const getUrlQuery= state => state.routing.locationBeforeTransitions.query;

function auth(action) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                userName: action.payload.userName,
                permissions: [1, 2, 3]
            });
        }, 2000)
    })
}

export function* logInFlow(action) {
    const {userName, permissions} = yield call(auth, action);
    const urlQuery = yield select(getUrlQuery);
    const redirectUrl = urlQuery.redirectUrl || '/';

    yield put(setUser(userName));
    yield put(setPermissions(permissions));

    localStorage.setItem('user', userName);
    localStorage.setItem('permissions', JSON.stringify(permissions));

    yield put(push(redirectUrl));
}

export function* logOutFlow(action) {
    yield put(setUser(null));
    yield put(setPermissions(null));

    localStorage.setItem('user', null);
    localStorage.setItem('permissions', null);

    yield put(push('/login'));
}

export function* checkAuthFlow(action) {
    const user = yield select(getUser);
    const next = action.payload.next;

    if (user) {
        yield fork(checkPermissionsFlow, action);
    } else {
        yield put(replace('/login'));
        next();
    }
}

export function* checkPermissionsFlow(action) {
    const permissions = yield select(getPermissions);
    const routePermissions = action.payload.permissions;
    const next = action.payload.next;

    if (routePermissions) {
        if (hasPermissions(routePermissions, permissions)) {
            next();
        } else {
            yield put(replace('/nopermissions'));
            next();
        }
    } else {
        next();
    }
}

function hasPermissions(routePermissions, permissions) {
    return routePermissions.every(per => permissions.includes(per));
}

export default function* watchAuth() {
    yield takeEvery(constants.LOG_IN, logInFlow);
    yield takeEvery(constants.LOG_OUT, logOutFlow);
    yield takeEvery(constants.CHECK_AUTH, checkAuthFlow);
}