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
    case actionType.INIT_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
      };
    case actionType.CHANGE_USER_ORDERS_LIST_IS_LOAD:
      return {
        ...state,
        userOrdersListIsLoad: action.payload,
      };
    default:
      return state;
  }
}
