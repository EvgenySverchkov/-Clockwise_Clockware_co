export default function main_adminPanel_reduser(state = {}, action) {
  switch (action.type) {
    case "CHNG_CURR_ITEM_FOR_MODAL":
      return {
        ...state,
        currItemForModal: action.payload,
      };
    case "TOOGLE_AUTH_ADMIN":
      return {
        ...state,
        isAuth: action.payload,
      };
    case "CHANGE_AUTH_IS_LOAD":
      return {
        ...state,
        authIsLoad: action.payload,
      };
    case "CHANGE_ADD_NEW_TOWN_FORM_IS_LOAD":
      return {
        ...state,
        newTownFormIsLoad: action.payload,
      };
    case "CHANGE_ADD_NEW_MASTER_FORM_IS_LOAD":
      return {
        ...state,
        newMasterFormIsLoad: action.payload,
      };
    case "CHANGE_EDIT_FORM_IS_LOAD":
      return {
        ...state,
        editFormIsLoad: action.payload,
      };
    case "CHANGE_ADD_NEW_ORDER_FORM_IS_LOAD":
      return {
        ...state,
        newOrderFormIsLoad: action.payload,
      };
    default:
      return state;
  }
}
