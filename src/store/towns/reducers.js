import * as actionType from "./actionTypes";

export default function client_towns_reduser(state = {}, action) {
  switch (action.type) {
    case actionType.ADD_TOWNS_TO_STATE:
      return {
        ...state,
        townsArr: action.payload,
      };
    case actionType.CHANGE_TOWNS_FROM_ORDER_FORM_IS_LOAD:
      return {
        ...state,
        townsInOrderFormIsLoad: action.payload,
      };
    default:
      return state;
  }
}
