import {combineReducers} from 'redux';
import constants from './constanst';
import {initialStatePosts, initialStatePostsFilter, initialEditPost} from './initialStates';

const list = (state = initialStatePosts, action) => {
    switch (action.type) {
        case constants.FETCH_START_POSTS: {
            const {loading} = action.payload;
            return {...state, loading};
        }
        case constants.FETCH_SUCCESS_POSTS: {
            const loading = action.payload.loading;
            const data = action.payload.data;
            const total = action.payload.total;
            return {...state, data, total, loading};
        }
        case constants.FETCH_FAILURE_POSTS: {
            const loading = false;
            const data = [];
            const total = 0;
            const error = action.payload;
            return {...state, data, total, loading, error};
        }
        default:
            return state;
    }
};

const filter = (state = initialStatePostsFilter, action) => {
    switch (action.type) {
        case constants.CHANGE_POSTS_PAGE:
            const paging = action.payload;
            return {...state, paging};
        case constants.CHANGE_POSTS_SORT:
            const sort = action.payload;
            return {...state, sort};
        default:
            return state;
    }
};

const edit = (state = initialEditPost, action) => {
    switch (action.type) {
        case constants.SET_EDIT_POST:
            const post = action.payload;
            return {...state, ...post};
        case constants.CLEAR_EDIT_POST:
            return {...initialEditPost};
        default:
            return state;
    }
};

export default combineReducers({
    list,
    filter,
    edit
});