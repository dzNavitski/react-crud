import axios from 'axios';

export const getPosts = (filter, source) => {
    return axios({
        method: 'get',
        url: '/posts',
        params: {
            _sort: filter.sort.dataIndex,
            _order: filter.sort.order,
            _page: filter.paging.active,
            _limit: filter.paging.limit
        },
        cancelToken: source && source.token
    });
};

export const getPost = (id, source) => {
    return axios({
        method: 'get',
        url: `/posts/${id}`,
        cancelToken: source && source.token
    });
};

export const createPost = (data) => {
    return axios({
        method: 'post',
        url: '/posts',
        data
    });
};

export const updatePost = (id, data) => {
    return axios({
        method: 'put',
        url: `/posts/${id}`,
        data
    });
};