const initialState = {
    user: null,
    permissions: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            const user = action.payload;
            console.log(state, action);
            return {...state, user};
        }
        case 'SET_PERMISSIONS': {
            const permissions = action.payload;
            console.log(state, action);
            return {...state, permissions};
        }
        default:
            return state
    }
};

export default auth;