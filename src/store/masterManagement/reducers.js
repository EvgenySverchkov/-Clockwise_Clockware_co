import * as actionType from "./actionTypes";

export default function master_reducer(state = {}, action) {
  switch (action.type) {
    case actionType.INIT_MASTERS:
      return {
        ...state,
        masters: action.payload,
      };
    case actionType.ADD_NEW_MASTER:
      return {
        ...state,
        masters: [...state.masters, action.payload].sort((a, b) => a.id - b.id),
      };
    case actionType.UPDATE_MASTER:
      return {
        ...state,
        masters: state.masters.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case actionType.DELETE_MASTER:
      return {
        ...state,
        masters: state.masters.filter((item) =>
          item.id !== action.payload ? true : false
        ),
      };
    case actionType.ADD_SUITABLE_MASTERS:
      return {
        ...state,
        suitableMasters: action.payload,
      };
    case actionType.CHANGE_ADD_NEW_MASTER_FORM_IS_LOAD:
      return {
        ...state,
        newMasterFormIsLoad: action.payload,
      };
    case actionType.MSTER_LIST_IS_LOAD:
      return {
        ...state,
        masterListIsLoad: action.payload,
      };
    default:
      return state;
  }
}
