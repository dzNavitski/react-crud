const initialState = {
    user: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            const user = action.payload;
            console.log(state, action);
            return {...state, user};
        }
        default:
            return state
    }
};

export default auth;