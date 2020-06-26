export default function client_order_reduser(state={}, action){
  switch(action.type){
    case "ADD_CURRNET_ORDER":
      return {
        ...state,
        currentOrder: action.payload
      }
    case "ADD_SUITABLE_MASTERS":
      return {
        ...state,
        suitableMasters: action.payload
      }
    case "ADD_ORDERS_TO_STATE":
      return {
        ...state,
        ordersArr: action.payload
      }
    default:
      return state;
  }
}
