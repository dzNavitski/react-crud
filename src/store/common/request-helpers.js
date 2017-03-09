import {call} from 'redux-saga/effects';
import axios from 'axios';

export function* cancelableRequest(forked, ...rest) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const response = yield call(forked, source, ...rest);
    return response;
}