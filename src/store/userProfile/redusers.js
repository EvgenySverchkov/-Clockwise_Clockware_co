import * as actionType from "./actionTypes";

export default function userProfileReducer(state = {}, action) {
  switch (action.type) {
    case actionType.CHANGE_EDIT_USER_DATA_IS_LOAD:
      return {
        ...state,
        editUserDataIsLoad: action.payload,
      };
    default:
      return state;
  }
}
