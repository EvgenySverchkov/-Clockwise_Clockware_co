export const addNewMaster = (masterInfo) => ({type: "ADD_NEW_MASTER", payload: masterInfo});
export const initMasters = (mastersArr) => ({type: "INIT_MASTERS", payload: mastersArr});
export const deleteMaster = (id) => ({type: "DELETE_MASTER", payload: id});

export const deleteClient = (by) => ({type: "DELETE_CLIENT", payload: by})

export const townsInit = (townsString) => ({type: "INIT_NEW_TOWNS", payload: townsString})
export const addNewTown = (townName) => ({type: "ADD_NEW_TOWN", payload: townName});
export const deleteTown = (id) => ({type: "DELETE_TOWN", payload: id});
