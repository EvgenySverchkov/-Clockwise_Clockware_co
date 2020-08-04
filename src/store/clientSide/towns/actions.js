import * as actionType from "./actionTypes";

export const addTownsToState = (arr) => ({
    type: actionType.ADD_TOWNS_TO_STATE,
    payload: arr,
  });