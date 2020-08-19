import * as actionType from "./actionTypes";

export const changeSuccessModalData = (obj) => ({
  type: actionType.CHANGE_SUCCESS_MODAL_DATA,
  payload: obj,
});

export const changeWarningModalData = (obj) => ({
  type: actionType.CHANGE_WARNING_MODAL_DATA,
  payload: obj,
});
