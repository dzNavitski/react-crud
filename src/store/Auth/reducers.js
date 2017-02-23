import {combineReducers} from 'redux';
import constants from './constanst';
import {initialStateAuth} from './initialStates';

const auth = (state = initialStateAuth, action) => {
    switch (action.type) {
        case constants.SET_USER: {
            const user = action.payload;
            return {...state, user};
        }
        case constants.SET_PERMISSIONS: {
            const permissions = action.payload;
            return {...state, permissions};
        }
        default:
            return state;
    }
};

export default auth;