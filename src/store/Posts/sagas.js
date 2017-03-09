import {takeEvery, takeLatest} from 'redux-saga';
import {put, call, select, cancelled} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import constants from './constanst';
import {getPosts, getPost, createPost, updatePost} from './endpoints';
import {fetchSuccessPosts, setEditPost} from './actions';
import {cancelableRequest} from '../common/request-helpers';

const getSort = state => state.posts.filter.sort;
const getPaging = state => state.posts.filter.paging;

export function* fetchPostsFlow() {
    try {
        const sort = yield select(getSort);
        const paging = yield select(getPaging);
        yield put(showLoading());
        const postsResponse = yield call(cancelableRequest, fetchPosts, sort, paging);
        yield put(fetchSuccessPosts(postsResponse.data, postsResponse.headers['x-total-count']));
    } finally {
        yield put(hideLoading());
    }
}

function* fetchPosts(source, sort, paging) {
    try {
        const response = yield call(getPosts, {sort, paging}, source);
        return  response;
    } catch (e) {
        console.error(e);
    } finally {
        if (yield cancelled()) {
            source.cancel('Operation canceled by the user.');
        }
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
    try {
        const id = action.payload;
        yield put(showLoading());
        const postResponse = yield call(cancelableRequest, fetchPost, id);
        yield put(setEditPost(postResponse.data));
    } finally {
        yield put(hideLoading());
    }
}

function* fetchPost(source, id) {
    try {
        const response = yield call(getPost, id, source);
        return response;
    } catch (e) {
        console.error(e);
    } finally {
        if (yield cancelled()) {
            source.cancel('Operation canceled by the user.');
        }
    }
}

export default function* watchPosts() {
    yield takeLatest([constants.INIT_POSTS, constants.CHANGE_POSTS_PAGE, constants.CHANGE_POSTS_SORT], fetchPostsFlow);
    yield takeLatest(constants.FETCH_POST, fetchPostFlow);
    yield takeEvery(constants.CREATE_POST, createPostFlow);
    yield takeEvery(constants.UPDATE_POST, updatePostFlow);
}