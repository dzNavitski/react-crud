import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { setUser } from '../actions';

const getUser = state => state.auth.user;

function auth(action) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(action.payload.userName);
        }, 2000)
    })
}

export function* logIn(user) {
    const userName = yield call(auth, user);

    yield put(setUser(userName));

    yield put(push('/posts'));
}

export function* watchAuth() {
    yield takeEvery('LOG_IN', logIn);
}