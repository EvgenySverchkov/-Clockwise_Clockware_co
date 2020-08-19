import * as actionType from "./actionTypes";

export default function adminModalWindows(state = {}, action) {
  switch (action.type) {
    case actionType.CHNG_CURR_ITEM_FOR_MODAL:
      return {
        ...state,
        currItemForModal: action.payload,
      };
    case actionType.CHANGE_SUCCESS_MODAL_DATA_ADMIN:
      return {
        ...state,
        modalDataAdmin: action.payload,
      };
    case actionType.CHANGE_MODAL_WARNING_DATA_ADMIN:
      return {
        ...state,
        modalWarningDataAdmin: action.payload,
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
