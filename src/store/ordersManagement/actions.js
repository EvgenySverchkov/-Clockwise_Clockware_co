import * as actionType from "./actionTypes";

export const initOrders = (arr) => ({
  type: actionType.ADD_ORDERS,
  payload: arr,
});
export const deleteOrderFromState = (id) => ({
  type: actionType.DELETE_ORDER,
  payload: id,
});
export const updateOrderInState = (newObj) => ({
  type: actionType.UPDATE_ORDER,
  payload: newObj,
});
export const addCurrentOrderToState = (obj) => ({
  type: actionType.ADD_CURRNET_ORDER,
  payload: obj,
});
export const changeAdminOrderFormIsLoad = (data) => ({
  type: actionType.CHANGE_ADMIN_ORDER_FORM_IS_LOAD,
  payload: data,
});
export const initUserOrders = (data) => ({
  type: actionType.INIT_USER_ORDERS,
  payload: data,
});
export const changeUserOrdersListIsLoad = (data) => ({
  type: actionType.CHANGE_USER_ORDERS_LIST_IS_LOAD,
  payload: data,
});
export const changeClientOrderFormIsLoad = (obj) => ({
  type: actionType.CHANGE_CLIENT_ORDER_FORM_IS_LOAD,
  payload: obj,
});
