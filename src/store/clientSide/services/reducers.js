import * as actionType from "./actionTypes";

export default function client_services(state={}, action){
    switch(action.type){
        case actionType.TOOGLE_AUTH:
            return {
            ...state,
            isAuth: action.payload,
            };
        case actionType.CHANGE_LOGIN_IS_LOAD:
            return {
            ...state,
            loginIsLoad: action.payload,
            };
        case actionType.CHANGE_SIGNUP_IS_LOAD:
            return {
            ...state,
            signUpIsLoad: action.payload,
            };
        case actionType.CHANGE_ORDER_FORM_IS_LOAD:
            return {
            ...state,
            orderFormIsLoad: action.payload,
            };
        case actionType.CHANGE_MASTER_LIST_IS_LOAD:
            return {
            ...state,
            masterListIsLoad: action.payload,
            };
        default:
            return state;
    }
}