const initialState = {
    data: [],
    total: 0,
    loading: false,
    error: null
};

const posts = (state = initialState, action) => {
    switch (action.type) {
        case 'POSTS_FETCH_START': {
            console.log(state, action);
            const loading = true;
            return {...state, loading};
        }
        case 'POSTS_FETCH_SUCCESS': {
            console.log(state, action);
            const loading = action.payload.loading;
            const data = action.payload.data;
            const total = action.payload.total;
            return {...state, data, total, loading };
        }
        case 'POSTS_FETCH_FAILURE': {
            console.log(state, action);
            const loading = action.payload.loading;
            const data = action.payload.data;
            const total = action.payload.total;
            const error = action.payload;
            return {...state, data, total, loading, error };
        }
        default:
            return state
    }
};

export default posts;