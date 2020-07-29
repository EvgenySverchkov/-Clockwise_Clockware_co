export default function orders_reducer(state = {}, action) {
  switch (action.type) {
    case "ADD_ORDERS":
      return {
        ...state,
        ordersArr: action.payload,
      };
    case "DELETE_ORDER":
      return {
        ...state,
        ordersArr: state.ordersArr.filter((item) =>
          item.id !== action.payload ? true : false
        ),
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        ordersArr: state.ordersArr.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "ADD_SUITABLE_MASTERS":
      return {
        ...state,
        suitableMasters: action.payload,
      };
    case "ADD_CURRNET_ORDER":
      return {
        ...state,
        currentOrder: action.payload,
      };
    case "CHANGE_ORDER_FORM_IS_LOAD":
      return {
        ...state,
        orderFormIsLoad: action.payload,
      };
    default:
      return state;
  }
}
