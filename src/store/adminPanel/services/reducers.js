import * as actionType from "./actionTypes";

export default function main_adminPanel_reduser(state = {}, action) {
    switch (action.type) {
      case actionType.CHNG_CURR_ITEM_FOR_MODAL:
        return {
          ...state,
          currItemForModal: action.payload,
        };
      case actionType.TOOGLE_AUTH_ADMIN:
        return {
          ...state,
          isAuth: action.payload,
        };
      case actionType.CHANGE_AUTH_IS_LOAD:
        return {
          ...state,
          authIsLoad: action.payload,
        };
      case actionType.CHANGE_ADD_NEW_TOWN_FORM_IS_LOAD:
        return {
          ...state,
          newTownFormIsLoad: action.payload,
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
      case actionType.CHANGE_ORDER_FORM_IS_LOAD:
        return {
          ...state,
          orderFormIsLoad: action.payload
        }
      case actionType.CHANGE_SUCCESS_MODAL_DATA_ADMIN:
        return {
          ...state,
          modalDataAdmin: action.payload
        }
      case actionType.CHANGE_LIST_IS_LOAD:
        return {
          ...state,
          listIsLoad: action.payload
        }
      default:
        return state;
    }
}