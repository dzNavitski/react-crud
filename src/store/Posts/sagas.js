import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import constants from './constanst';
import {getPosts, createPost} from './endpoints';

const getSort = state => state.posts.filter.sort;
const getPaging = state => state.posts.filter.paging;

export function* fetchPostsFlow() {
    const sort = yield select(getSort);
    const paging = yield select(getPaging);

    yield put({
        type: constants.FETCH_START_POSTS,
        payload: true
    });

    try {
        const postsResponse = yield call(getPosts, {
            sort,
            paging
        });

        yield put({
            type: constants.FETCH_SUCCESS_POSTS,
            payload: {
                data: postsResponse.data,
                total: postsResponse.headers['x-total-count'],
                loading: false
            }
        });
    } catch(e) {
        yield put({
            type: constants.FETCH_FAILURE_POSTS,
            payload: {
                error: 'Can\'t load posts'
            }
        });
    }
}

export function* createPostFlow(post) {
    try {
        yield call(createPost, post.payload);

        yield put(push('/posts'));
    } catch(e) {

    }
}

export default function* watchPosts() {
    yield takeEvery(constants.INIT_POSTS, fetchPostsFlow);
    yield takeEvery(constants.CHANGE_POSTS_PAGE, fetchPostsFlow);
    yield takeEvery(constants.CHANGE_POSTS_SORT, fetchPostsFlow);
    yield takeEvery(constants.CREATE_POST, createPostFlow);
}