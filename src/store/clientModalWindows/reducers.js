import * as actionType from "./actionTypes";

export default function client_services(state = {}, action) {
  switch (action.type) {
    case actionType.CHANGE_SUCCESS_MODAL_DATA:
      return {
        ...state,
        modalSuccesData: action.payload,
      };
    case actionType.CHANGE_WARNING_MODAL_DATA:
      return {
        ...state,
        modalWarningData: action.payload,
      };
    default:
      return state;
  }
}
