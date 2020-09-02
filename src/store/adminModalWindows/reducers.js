import * as actionType from "./actionTypes";

export default function adminModalWindows(state = {}, action) {
  switch (action.type) {
    case actionType.CHNG_CURR_ITEM_FOR_MODAL:
      return {
        ...state,
        currItemForModal: action.payload,
      };
    case actionType.CHANGE_LIST_IS_LOAD:
      return {
        ...state,
        listIsLoad: action.payload,
      };
    default:
      return state;
  }
}
