export default function client_reduser(state={}, action){
  switch(action.type){
    case "DELETE_CLIENT":
      return {
        ...state,
        clients: state.clients.filter((item)=>(item.id!==action.payload)?true:false)
      }
    default:
      return state;
  }
}
