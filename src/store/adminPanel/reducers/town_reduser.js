export default function town_reduser(state={}, action){
  switch(action.type){
    case "ADD_NEW_TOWN":
      return {
        ...state,
        towns: [...state.towns, action.payload]
      }
    case "DELETE_TOWN":
      return {
        ...state,
        towns: state.towns.filter((item)=>(item!==action.payload)?true:false)
      }
    default:
      return state;
  }
}
