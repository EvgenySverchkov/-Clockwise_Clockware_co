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
