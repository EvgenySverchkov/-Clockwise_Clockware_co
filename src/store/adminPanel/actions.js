export const addNewMaster = (masterInfo) => ({type: "ADD_NEW_MASTER", payload: masterInfo});
export const initMasters = (mastersArr) => ({type: "INIT_MASTERS", payload: mastersArr});
export const deleteMasterFromState = (id) => ({type: "DELETE_MASTER", payload: id});
export const updateMasterInState = (newObj) => ({type: "UPDATE_MASTER", payload: newObj});

export const initOrders = (arr) => ({type: "ADD_ORDERS", payload: arr});
export const deleteOrderFromState = (id) => ({type: "DELETE_ORDER", payload: id});
export const updateOrderInState = (newObj) => ({type: "UPDATE_ORDER", payload: newObj})

export const townsInit = (townsString) => ({type: "INIT_NEW_TOWNS", payload: townsString})
export const addNewTown = (townName) => ({type: "ADD_NEW_TOWN", payload: townName});
export const deleteTownFromState = (id) => ({type: "DELETE_TOWN", payload: id});
export const updateTownInState = (newObj) => ({type: "UPDATE_TOWN", payload: newObj});

export const chngCurrItemForModal = (obj) => ({type: "CHNG_CURR_ITEM_FOR_MODAL", payload: obj});

export const toogleAuth = (data) => ({type: "TOOGLE_AUTH", payload: data});

export const changeAuthIsLoad = (data) => ({type: "CHANGE_AUTH_IS_LOAD", payload: data});
export const changeAddMewTownFormIsLoad = (data) => ({type: "CHANGE_ADD_NEW_TOWN_FORM_IS_LOAD", payload: data});
export const changeAddNewMasterFormIsLoad = (data) => ({type: "CHANGE_ADD_NEW_MASTER_FORM_IS_LOAD", payload: data});
export const changeAddMewOrderFormIsLoad = (data) => ({type: "CHANGE_ADD_NEW_ORDER_FORM_IS_LOAD", payload: data});
export const changeEditFormIsLoad = (data) => ({type: "CHANGE_EDIT_FORM_IS_LOAD", payload: data});