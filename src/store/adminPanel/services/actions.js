import * as actionType from "./actionTypes";

export const changeAddNewMasterFormIsLoad = (data) => ({
    type: actionType.CHANGE_ADD_NEW_MASTER_FORM_IS_LOAD,
    payload: data,
});
export const changeMasterListIsLoad = (data) => ({
    type: actionType.MSTER_LIST_IS_LOAD,
    payload: data,
});

export const changeOrderFormIsLoad = (data) => ({
    type: actionType.CHANGE_ORDER_FORM_IS_LOAD,
    payload: data,
});

export const changeAddMewTownFormIsLoad = (data) => ({
    type: actionType.CHANGE_ADD_NEW_TOWN_FORM_IS_LOAD,
    payload: data,
});

export const chngCurrItemForModal = (obj) => ({
    type: actionType.CHNG_CURR_ITEM_FOR_MODAL,
    payload: obj,
});
export const toogleAuth = (data) => ({ type: actionType.TOOGLE_AUTH_ADMIN, payload: data });
export const changeAuthIsLoad = (data) => ({
    type: actionType.CHANGE_AUTH_IS_LOAD,
    payload: data,
});

export const changeSuccessModalDataAdmin = (data) => ({
    type: actionType.CHANGE_SUCCESS_MODAL_DATA_ADMIN,
    payload: data,
});

export const changeListIsLoad = (data) => ({
    type: actionType.CHANGE_LIST_IS_LOAD,
    payload: data,
})