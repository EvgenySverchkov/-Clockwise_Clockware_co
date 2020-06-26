export default function orders_reducer(state={}, action){
  switch(action.type){
    case "ADD_ORDERS":
      return {
        ...state,
        ordersArr: action.payload
      }
    case "DELETE_ORDER":
      return {
        ...state,
        ordersArr: state.ordersArr.filter((item)=>(item.id!==action.payload)?true:false)
      }
    case "UPDATE_ORDER":
      return {
        ...state,
        ordersArr: state.ordersArr.map(item=>item.id===action.payload.id?action.payload:item)
      }
    default:
      return state;
  }
}
