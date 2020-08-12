import * as actionType from "./actionTypes";

export const toggleAuth = (data) => ({ type: actionType.TOOGLE_AUTH, payload: data });
export const changeLoginIsLoad = (data) => ({
  type: actionType.CHANGE_LOGIN_IS_LOAD,
  payload: data,
});
export const changeSignUpIsLoad = (data) => ({
  type: actionType.CHANGE_SIGNUP_IS_LOAD,
  payload: data,
});
export const changeOrderFormIsLoad = (data) => ({
  type: actionType.CHANGE_ORDER_FORM_IS_LOAD,
  payload: data,
});
export const changeMasterListIsLoad = (data) => ({
  type: actionType.CHANGE_MASTER_LIST_IS_LOAD,
  payload: data,
});

export const changeSuccessModalData = (obj) => ({
  type: actionType.CHANGE_SUCCESS_MODAL_DATA,
  payload: obj,
});

export const changeWarningModalData = (obj) => ({
  type: actionType.CHANGE_WARNING_MODAL_DATA,
  payload: obj
})

export const changeTownsFromOrderFormIsLoad = (data) => ({
  type: actionType.CHANGE_TOWNS_FROM_ORDER_FORM_IS_LOAD,
  payload: data
})