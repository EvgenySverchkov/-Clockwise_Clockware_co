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
    case "ADD_NEW_ORDER":
      return {
        ...state,
        ordersArr: [...state.ordersArr, action.payload].sort((a, b)=>a.id - b.id)
      }
    case "TOOGLE_AUTH":
      return {
        ...state,
        isAuth: action.payload
      }
    case 'CHANGE_LOGIN_IS_LOAD':
      return {
        ...state,
        loginIsLoad: action.payload
      }
    case 'CHANGE_SIGNUP_IS_LOAD':
      return {
        ...state,
        signUpIsLoad: action.payload
      }
    case 'CHANGE_ORDER_FORM_IS_LOAD':
      return {
        ...state,
        orderFormIsLoad: action.payload
      }
    case 'CHANGE_MASTER_LIST_IS_LOAD':
      return {
        ...state,
        masterListIsLoad: action.payload
      }
    default:
      return state;
  }
}
