import * as actionType from "./actionTypes";

export const addCurrentOrderToState = (obj) => ({
  type: actionType.ADD_CURRNET_ORDER,
  payload: obj,
});
export const addSuitableMasters = (arr) => ({
  type: actionType.ADD_SUITABLE_MASTERS,
  payload: arr,
});
