export default function master_reducer(state={}, action){
  switch(action.type){
    case "ADD_NEW_MASTER":
      return {
        ...state,
        masters: [...state.masters, action.payload]
      }
    case "TOGGLE_ADD_MASTER_FORM":
      return {
        ...state,
        isAddMaster: action.payload
      }
    default:
      return state;
  }
}
