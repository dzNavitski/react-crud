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

export const fetchSuccessPosts = (posts) => {
    return {
        type: constants.FETCH_SUCCESS_POSTS,
        payload: {
            data: posts.data,
            total: posts.total,
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

export const createPost = (post) => {
    return {
        type: 'CREATE_POST',
        payload: post
    }
};