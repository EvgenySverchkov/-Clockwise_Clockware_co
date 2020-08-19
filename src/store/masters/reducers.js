import * as actionType from "./actionTypes";

export default function client_order_reduser(state = {}, action) {
  switch (action.type) {
    case actionType.ADD_SUITABLE_MASTERS:
      return {
        ...state,
        suitableMasters: action.payload,
      };
    case actionType.CHANGE_MASTER_LIST_IS_LOAD:
      return {
        ...state,
        masterListIsLoad: action.payload,
      };
    default:
      return state;
  }
}
