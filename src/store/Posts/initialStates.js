export const initialStatePosts = {
    data: [],
    total: 0,
    loading: false,
    error: null
};

export const initialStatePostsFilter = {
    paging: {
        limit: 5,
        offset: 0,
        active: 1
    },
    sort: {
        dataIndex: 'id',
        order: 'ASC'
    }
};