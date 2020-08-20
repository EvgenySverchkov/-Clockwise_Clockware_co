import * as actionType from "./actionTypes";

export const addCurrentOrderToState = (obj) => ({
  type: actionType.ADD_CURRNET_ORDER,
  payload: obj,
});
export const changeClientOrderFormIsLoad = (obj) => ({
  type: actionType.CHANGE_CLIENT_ORDER_FORM_IS_LOAD,
  payload: obj,
});

export const initUserOrders = (data) => ({
  type: actionType.INIT_USER_ORDERS,
  payload: data,
});

export const changeUserOrdersListIsLoad = (data) => ({
  type: actionType.CHANGE_USER_ORDERS_LIST_IS_LOAD,
  payload: data,
});
