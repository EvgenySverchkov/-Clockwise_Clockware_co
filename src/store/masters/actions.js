import * as actionType from "./actionTypes";

export const addSuitableMasters = (arr) => ({
  type: actionType.ADD_SUITABLE_MASTERS,
  payload: arr,
});
export const changeMasterListIsLoad = (data) => ({
  type: actionType.CHANGE_MASTER_LIST_IS_LOAD,
  payload: data,
});
