import * as actionType from "./actionTypes";

export default function client_order_reduser(state = {}, action) {
  switch (action.type) {
    case actionType.ADD_CURRNET_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    case actionType.CHANGE_CLIENT_ORDER_FORM_IS_LOAD:
      return {
        ...state,
        orderFormIsLoad: action.payload,
      };
    default:
      return state;
  }
}
