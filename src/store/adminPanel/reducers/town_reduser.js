export default function town_reduser(state={}, action){
  switch(action.type){
    case "INIT_NEW_TOWNS":
      return {
        ...state,
        towns: action.payload
      }
    case "UPDATE_TOWN":
      return {
        ...state,
        towns: state.towns.map(item=>item.id===action.payload.id?action.payload:item)
      }
    case "ADD_NEW_TOWN":
      return {
        ...state,
        towns: [...state.towns, action.payload].sort((a,b)=>a.id-b.id)
      }
    case "DELETE_TOWN":
      return {
        ...state,
        towns: state.towns.filter((item)=>(item.id!==action.payload)?true:false)
      }
    default:
      return state;
  }
}
