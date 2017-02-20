export const changePostsPage = (paging) => {
    return {
        type: 'CHANGE_POSTS_PAGE',
        payload: paging
    }
};

export const changePostsSort = (sort) => {
    return {
        type: 'CHANGE_POSTS_SORT',
        payload: sort
    }
};

export const initPosts = () => {
    return {
        type: 'INIT_POSTS'
    }
};

export const postsFetchStart = () => {
    return {
        type: 'POSTS_FETCH_START',
        payload: true
    }
};

export const postsFetchSuccess = (posts) => {
    return {
        type: 'POSTS_FETCH_SUCCESS',
        payload: {
            data: posts.data,
            total: posts.total,
            loading: false,
            error: null
        }
    }
};

export const postsFetchFailure = (error) => {
    return {
        type: 'POSTS_FETCH_FAILURE',
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

export const logIn = (user) => {
    return {
        type: 'LOG_IN',
        payload: user
    }
};

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
};