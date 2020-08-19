import * as actionType from "./actionTypes";

export default function town_reduser(state = {}, action) {
  switch (action.type) {
    case actionType.INIT_NEW_TOWNS:
      return {
        ...state,
        towns: action.payload,
      };
    case actionType.UPDATE_TOWN:
      return {
        ...state,
        towns: state.towns.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case actionType.ADD_NEW_TOWN:
      return {
        ...state,
        towns: [...state.towns, action.payload].sort((a, b) => a.id - b.id),
      };
    case actionType.DELETE_TOWN:
      return {
        ...state,
        towns: state.towns.filter((item) =>
          item.id !== action.payload ? true : false
        ),
      };
    case actionType.CHANGE_ADD_NEW_TOWN_FORM_IS_LOAD:
      return {
        ...state,
        newTownFormIsLoad: action.payload,
      };
    default:
      return state;
  }
}
