import * as actionType from "./actionTypes";

export const chngCurrItemForModal = (obj) => ({
  type: actionType.CHNG_CURR_ITEM_FOR_MODAL,
  payload: obj,
});

export const changeSuccessModalDataAdmin = (data) => ({
  type: actionType.CHANGE_SUCCESS_MODAL_DATA_ADMIN,
  payload: data,
});

export const changeModalWarningDataAdmin = (data) => ({
  type: actionType.CHANGE_MODAL_WARNING_DATA_ADMIN,
  payload: data,
});

export const changeListIsLoad = (data) => ({
  type: actionType.CHANGE_LIST_IS_LOAD,
  payload: data,
});
