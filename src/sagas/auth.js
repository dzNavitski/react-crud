import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { setUser } from '../actions';

const getUser = state => state.auth.user;

function auth(action) {
    console.log(action)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(action.payload.userName);
        }, 2000)
    })
}

function checkAuthPromise(action) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(action.payload);
        }, 2000)
    })
}

export function* logIn(action) {
    const userName = yield call(auth, action);

    yield put(setUser(userName));

    yield put(push('/posts'));
}

export function* checkAuth(action) {
    const cb = yield call(checkAuthPromise, action);
    cb();
}

export function* watchAuth() {
    yield takeEvery('LOG_IN', logIn);
    yield takeEvery('CHECK_AUTH', checkAuth);
}