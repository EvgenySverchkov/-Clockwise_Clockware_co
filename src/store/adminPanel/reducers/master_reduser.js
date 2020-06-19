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
    case "TOGGLE_SHOW_MASTER_LIST":
      return {
        ...state,
        isMasterList: action.payload
      }
    case "DELETE_MASTER":
      return {
        ...state,
        masters: state.masters.filter((item)=>(item.id!==action.payload)?true:false)
      }
    default:
      return state;
  }
}
