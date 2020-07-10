export const addCurrentOrderToState = (obj) => ({type: "ADD_CURRNET_ORDER", payload: obj});
export const addSuitableMasters = (arr) => ({type: "ADD_SUITABLE_MASTERS", payload: arr});
export const addOrdersToState = (arr) => ({type: "ADD_ORDERS_TO_STATE", payload: arr});
export const addNewOrderToState = (newObj) => ({type: "ADD_NEW_ORDER", payload: newObj});
export const toggleAuth = (data) => ({type: "TOOGLE_AUTH", payload: data});
