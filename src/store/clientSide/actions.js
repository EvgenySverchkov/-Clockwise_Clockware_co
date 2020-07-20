export const addCurrentOrderToState = (obj) => ({
  type: "ADD_CURRNET_ORDER",
  payload: obj,
});
export const addSuitableMasters = (arr) => ({
  type: "ADD_SUITABLE_MASTERS",
  payload: arr,
});
export const addOrdersToState = (arr) => ({
  type: "ADD_ORDERS_TO_STATE",
  payload: arr,
});
export const addNewOrderToState = (newObj) => ({
  type: "ADD_NEW_ORDER",
  payload: newObj,
});
export const addTownsToState = (arr) => ({
  type: "ADD_TOWNS_TO_STATE",
  payload: arr,
});

export const toggleAuth = (data) => ({ type: "TOOGLE_AUTH", payload: data });
export const changeLoginIsLoad = (data) => ({
  type: "CHANGE_LOGIN_IS_LOAD",
  payload: data,
});
export const changeSignUpIsLoad = (data) => ({
  type: "CHANGE_SIGNUP_IS_LOAD",
  payload: data,
});
export const changeOrderFormIsLoad = (data) => ({
  type: "CHANGE_ORDER_FORM_IS_LOAD",
  payload: data,
});
export const changeMasterListIsLoad = (data) => ({
  type: "CHANGE_MASTER_LIST_IS_LOAD",
  payload: data,
});