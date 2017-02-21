import { takeEvery } from 'redux-saga';
import { put, call, select, fork } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';
import { setUser, setPermissions } from '../actions';

const getUser = state => state.postsRoot.auth.user;
const getPermissions = state => state.postsRoot.auth.permissions;

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

export function* logIn(action) {
    const {userName, permissions} = yield call(auth, action);

    yield put(setUser(userName));
    yield put(setPermissions(permissions));

    yield put(push('/posts'));
}

export function* checkAuth(action) {
    const user = yield select(getUser);
    const next = action.payload.next;

    if (user) {
        yield fork(checkPermissions, action);
    } else {
        yield put(replace('/login'));
        next();
    }
}

export function* checkPermissions(action) {
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

export function* watchAuth() {
    yield takeEvery('LOG_IN', logIn);
    yield takeEvery('CHECK_AUTH', checkAuth);
}