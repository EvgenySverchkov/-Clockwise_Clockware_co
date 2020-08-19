import * as actionType from "./actionTypes";

export const addTownsToState = (arr) => ({
  type: actionType.ADD_TOWNS_TO_STATE,
  payload: arr,
});

export const changeTownsFromOrderFormIsLoad = (data) => ({
  type: actionType.CHANGE_TOWNS_FROM_ORDER_FORM_IS_LOAD,
  payload: data,
});
