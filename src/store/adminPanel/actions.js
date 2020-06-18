export const addNewMaster = (masterInfo) => ({type: "ADD_NEW_MASTER", payload: masterInfo});
export const toggleAddMasterForm = (info) => ({type: "TOGGLE_ADD_MASTER_FORM", payload: info});
export const toggleShowMasterList = (info) => ({type: "TOGGLE_SHOW_MASTER_LIST", payload: info});

export const toggleShowClientsList = (info) => ({type: "TOGGLE_SHOW_CLIENTS_LIST", payload: info});

export const addNewTown = (townName) => ({type: "ADD_NEW_TOWN", payload: townName});
export const toogleAddTownForm = (info) => ({type: "TOGGLE_ADD_NEW_TOWN_FORM", payload: info});
