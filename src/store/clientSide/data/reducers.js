import * as actionType from "./actionTypes";

export default function client_order_reduser(state = {}, action) {
    switch (action.type) {
      case actionType.ADD_CURRNET_ORDER:
        return {
          ...state,
          currentOrder: action.payload,
        };
      case actionType.ADD_SUITABLE_MASTERS:
        return {
          ...state,
          suitableMasters: action.payload,
        };
      default:
        return state;
    }
}