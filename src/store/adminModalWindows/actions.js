import * as actionType from "./actionTypes";

export const chngCurrItemForModal = (obj) => ({
  type: actionType.CHNG_CURR_ITEM_FOR_MODAL,
  payload: obj,
});

export const changeListIsLoad = (data) => ({
  type: actionType.CHANGE_LIST_IS_LOAD,
  payload: data,
});
