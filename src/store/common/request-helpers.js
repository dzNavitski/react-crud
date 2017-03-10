import {call, cancelled} from 'redux-saga/effects';
import axios from 'axios';

export function* cancelableRequest(forked, ...rest) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    try {
        const response = yield call(forked, source, ...rest);
        return response;
    } finally {
        if (yield cancelled()) {
            source.cancel('Operation canceled by the user.');
        }
    }
}