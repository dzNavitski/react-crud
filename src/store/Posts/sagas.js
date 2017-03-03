import {takeEvery, takeLatest} from 'redux-saga';
import {put, call, select, cancelled} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import constants from './constanst';
import {getPosts, createPost, getPost} from './endpoints';
import {setEditPost} from './actions';

const getSort = state => state.posts.filter.sort;
const getPaging = state => state.posts.filter.paging;

export function* fetchPostsFlow() {
    const sort = yield select(getSort);
    const paging = yield select(getPaging);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    yield put({
        type: constants.FETCH_START_POSTS,
        payload: {
            loading: true
        }
    });

    yield put(showLoading());

    try {
        const postsResponse = yield call(getPosts, {
            sort,
            paging
        }, source);

        yield put({
            type: constants.FETCH_SUCCESS_POSTS,
            payload: {
                data: postsResponse.data,
                total: postsResponse.headers['x-total-count'],
                loading: false
            }
        });
    } catch (e) {
        yield put({
            type: constants.FETCH_FAILURE_POSTS,
            payload: {
                error: 'Can\'t load posts'
            }
        });
    } finally {
        if (yield cancelled()) {
            source.cancel('Operation canceled by the user.');
        }

        yield put(hideLoading());
    }
}

export function* createPostFlow(post) {
    try {
        yield put(showLoading());
        yield call(createPost, post.payload);

        yield put(push('/posts'));
    } catch (e) {

    } finally {
        yield put(hideLoading());
    }
}

export function* fetchPostFlow(action) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const id = action.payload;

    try {
        yield put(showLoading());
        const postResponse = yield call(getPost, id, source);
        yield put(setEditPost(postResponse.data))
    } catch (e) {

    } finally {
        if (yield cancelled()) {
            source.cancel('Operation canceled by the user.');
        }

        yield put(hideLoading());
    }
}

export default function* watchPosts() {
    yield takeLatest([constants.INIT_POSTS, constants.CHANGE_POSTS_PAGE, constants.CHANGE_POSTS_SORT], fetchPostsFlow);
    yield takeEvery(constants.CREATE_POST, createPostFlow);
    yield takeLatest(constants.FETCH_POST, fetchPostFlow);
}