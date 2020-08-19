import * as actionType from "./actionTypes";

export const addNewMaster = (masterInfo) => ({
  type: actionType.ADD_NEW_MASTER,
  payload: masterInfo,
});
export const initMasters = (mastersArr) => ({
  type: actionType.INIT_MASTERS,
  payload: mastersArr,
});
export const deleteMasterFromState = (id) => ({
  type: actionType.DELETE_MASTER,
  payload: id,
});
export const updateMasterInState = (newObj) => ({
  type: actionType.UPDATE_MASTER,
  payload: newObj,
});
export const addSuitableMasters = (arr) => ({
  type: actionType.ADD_SUITABLE_MASTERS,
  payload: arr,
});
export const changeAddNewMasterFormIsLoad = (data) => ({
  type: actionType.CHANGE_ADD_NEW_MASTER_FORM_IS_LOAD,
  payload: data,
});
export const changeMasterListIsLoad = (data) => ({
  type: actionType.MSTER_LIST_IS_LOAD,
  payload: data,
});
