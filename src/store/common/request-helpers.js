import {call} from 'redux-saga/effects';
import axios from 'axios';

export function* cancebleRequest(forked, ...rest) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    try {
        const response = yield call(forked, source, ...rest);
        return response;
    } catch (e) {
        console.error(e);
    }
}