import axios from 'axios';

export const getPosts = (filter) => {
    return axios({
        method: 'get',
        url: '/posts',
        params: {
            _sort: filter.sort.dataIndex,
            _order: filter.sort.order,
            _page: filter.paging.active,
            _limit: filter.paging.limit
        }
    });
};

export const createPost = (data) => {
    return axios({
        method: 'post',
        url: '/posts',
        data
    })
};