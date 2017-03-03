import {takeEvery, takeLatest} from 'redux-saga';
import {put, call, select, cancelled} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import constants from './constanst';
import {getPosts, getPost, createPost, updatePost} from './endpoints';
import {fetchSuccessPosts, fetchFailurePosts, setEditPost} from './actions';

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
        const postsResponse = yield call(getPosts, {sort, paging}, source);
        yield put(fetchSuccessPosts(postsResponse.data, postsResponse.headers['x-total-count']));
    } catch (e) {
        yield put(fetchFailurePosts('Can\'t load posts'));
    } finally {
        if (yield cancelled()) {
            source.cancel('Operation canceled by the user.');
        }

        yield put(hideLoading());
    }
}

export function* createPostFlow(action) {
    try {
        yield put(showLoading());
        yield call(createPost, action.payload);

        yield put(push('/posts'));
    } catch (e) {

    } finally {
        yield put(hideLoading());
    }
}

export function* updatePostFlow(action) {
    try {
        const {id} = action.payload;
        yield put(showLoading());
        yield call(updatePost, id, action.payload);

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
        yield put(setEditPost(postResponse.data));
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
    yield takeLatest(constants.FETCH_POST, fetchPostFlow);
    yield takeEvery(constants.CREATE_POST, createPostFlow);
    yield takeEvery(constants.UPDATE_POST, updatePostFlow);
}