import constants from './constanst';

export const logIn = (user) => {
    return {
        type: constants.LOG_IN,
        payload: user
    }
};

export const logOut = () => {
    return {
        type: constants.LOG_OUT
    }
};

export const setUser = (user) => {
    return {
        type: constants.SET_USER,
        payload: user
    }
};

export const setPermissions = (permissions) => {
    return {
        type: constants.SET_PERMISSIONS,
        payload: permissions
    }
};

export const checkAuth = (permissions, next) => {
    return {
        type: constants.CHECK_AUTH,
        payload: {
            permissions,
            next
        }
    }
};