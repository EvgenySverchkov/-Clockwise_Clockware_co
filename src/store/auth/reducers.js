import * as actionType from "./actionTypes";

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case actionType.TOOGLE_AUTH_ADMIN:
      return {
        ...state,
        isAuthAdmin: action.payload,
      };
    case actionType.TOOGLE_AUTH_CLIENT:
      return {
        ...state,
        isAuthClient: action.payload,
      };
    case actionType.CHANGE_ADMIN_LOGIN_IS_LOAD:
      return {
        ...state,
        adminLoginIsLoad: action.payload,
      };
    case actionType.CHANGE_CLIENT_LOGIN_IS_LOAD:
      return {
        ...state,
        clientLoginIsLoad: action.payload,
      };
    case actionType.CHANGE_SIGNUP_IS_LOAD:
      return {
        ...state,
        signUpIsLoad: action.payload,
      };
    default:
      return state;
  }
}
