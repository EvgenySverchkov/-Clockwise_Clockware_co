export default function master_reducer(state={}, action){
  switch(action.type){
    case "INIT_MASTERS":
      return {
        ...state,
        masters: action.payload
      }
    case "ADD_NEW_MASTER":
      return {
        ...state,
        masters: [...state.masters, action.payload]
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
