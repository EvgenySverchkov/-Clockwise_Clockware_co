export default function town_reduser(state={}, action){
  function replace(id, obj, arr){
    let copyArr = [...arr];
    let idx = arr.findIndex(item=>item.id === id);
    copyArr.splice(idx, 1, obj)
    return copyArr
  }
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
        towns: [...state.towns, action.payload]
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
