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
        masters: [...state.masters, action.payload].sort((a, b)=>a.id - b.id)
      }
    case "UPDATE_MASTER":
      return {
        ...state,
        masters: state.masters.map(item=>item.id===action.payload.id?action.payload:item)
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
