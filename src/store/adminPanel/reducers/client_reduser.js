export default function client_reduser(state={}, action){
  switch(action.type){
    case "TOGGLE_SHOW_CLIENTS_LIST":
      return {
        ...state,
        isShowClientsList: action.payload
      }
    default:
      return state;
  }
}
