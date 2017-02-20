import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import axios from 'axios';

//const getUser = state => state.auth.user;

function auth(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('authenticated', user);
        }, 2000)
    })
}

export function* logIn(user) {
    yield call(auth, user);

    yield put(push('/posts'));
}

export function* watchAuth() {
    yield takeEvery('LOG_IN', logIn);
}