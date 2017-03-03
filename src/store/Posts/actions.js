import constants from './constanst';

export const changePostsPage = (paging) => {
    return {
        type: constants.CHANGE_POSTS_PAGE,
        payload: paging
    }
};

export const changePostsSort = (sort) => {
    return {
        type: constants.CHANGE_POSTS_SORT,
        payload: sort
    }
};

export const initPosts = () => {
    return {
        type: constants.INIT_POSTS
    }
};

export const fetchStartPosts = () => {
    return {
        type: constants.FETCH_START_POSTS,
        payload: true
    }
};

export const fetchSuccessPosts = (data, total) => {
    return {
        type: constants.FETCH_SUCCESS_POSTS,
        payload: {
            data,
            total,
            loading: false,
            error: null
        }
    }
};

export const fetchFailurePosts = (error) => {
    return {
        type: constants.FETCH_FAILURE_POSTS,
        payload: {
            data: [],
            total: 0,
            loading: false,
            error: error
        }
    }
};

export const fetchPost = (id) => {
    return {
        type: constants.FETCH_POST,
        payload: id
    }
};

export const setEditPost = (post) => {
    return {
        type: constants.SET_EDIT_POST,
        payload: post
    }
};

export const clearEditPost = () => {
    return {
        type: constants.CLEAR_EDIT_POST
    }
};

export const createPost = (post) => {
    return {
        type: constants.CREATE_POST,
        payload: post
    }
};

export const updatePost = (post) => {
    return {
        type: constants.UPDATE_POST,
        payload: post
    }
};