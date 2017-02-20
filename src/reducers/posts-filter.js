const initialState = {
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

const postsFilter = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_POSTS_PAGE':
            console.log(state, action);
            const paging = action.payload;
            return {...state, paging};
        case 'CHANGE_POSTS_SORT':
            console.log(state, action);
            const sort = action.payload;
            return {...state, sort};
        default:
            return state
    }
};

export default postsFilter;