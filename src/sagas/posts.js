import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import axios from 'axios';

const getSort = state => state.postsRoot.postsFilter.sort;
const getPaging = state => state.postsRoot.postsFilter.paging;

export function* fetchPosts() {
    const sort = yield select(getSort);
    const paging = yield select(getPaging);

    yield put({
        type: 'POSTS_FETCH_START',
        payload: true
    });

    const postsResponse = yield call(axios, {
        method: 'get',
        url: '/posts',
        params: {
            _sort: sort.dataIndex,
            _order: sort.order,
            _page: paging.active,
            _limit: paging.limit
        }
    });

    yield put({
        type: 'POSTS_FETCH_SUCCESS',
        payload: {
            data: postsResponse.data,
            total: postsResponse.headers['x-total-count'],
            loading: false
        }
    });
}

export function* createPost(post) {
    yield call(axios, {
        method: 'post',
        url: '/posts',
        data: post.payload
    });

    yield put(push('/posts'));
}

export function* watchPosts() {
    yield takeEvery('CHANGE_POSTS_PAGE', fetchPosts);
    yield takeEvery('CHANGE_POSTS_SORT', fetchPosts);
    yield takeEvery('INIT_POSTS', fetchPosts);
    yield takeEvery('CREATE_POST', createPost);
}