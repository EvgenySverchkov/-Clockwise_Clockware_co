import * as actionType from "./actionTypes";

export const townsInit = (townsString) => ({
  type: actionType.INIT_NEW_TOWNS,
  payload: townsString,
});
export const addNewTown = (townName) => ({
  type: actionType.ADD_NEW_TOWN,
  payload: townName,
});
export const deleteTownFromState = (id) => ({
  type: actionType.DELETE_TOWN,
  payload: id,
});
export const updateTownInState = (newObj) => ({
  type: actionType.UPDATE_TOWN,
  payload: newObj,
});
export const changeAddMewTownFormIsLoad = (data) => ({
  type: actionType.CHANGE_ADD_NEW_TOWN_FORM_IS_LOAD,
  payload: data,
});
