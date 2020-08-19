import * as actionType from "./actionTypes";

export const toogleAuthAdmin = (data) => ({
    type: actionType.TOOGLE_AUTH_ADMIN,
    payload: data,
});

export const toogleAuthClient = (data) => ({
    type: actionType.TOOGLE_AUTH_CLIENT,
    payload: data,
});

export const changeClientLoginIsLoad = (data) => ({
    type: actionType.CHANGE_CLIENT_LOGIN_IS_LOAD,
    payload: data,
});

export const changeAdminLoginIsLoad = (data) => ({
    type: actionType.CHANGE_ADMIN_LOGIN_IS_LOAD,
    payload: data,
});

export const changeSignUpIsLoad = (data) => ({
    type: actionType.CHANGE_SIGNUP_IS_LOAD,
    payload: data,
});
