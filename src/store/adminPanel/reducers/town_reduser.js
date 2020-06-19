export default function town_reduser(state={}, action){
  switch(action.type){
    case "ADD_NEW_TOWN":
      return {
        ...state,
        towns: [...state.towns, action.payload]
      }
    case "TOGGLE_ADD_NEW_TOWN_FORM":
      return {
        ...state,
        isShowAddTownForm: action.payload
      }
    case "TOOGLE_SHOW_TOWNS_LIST":
      return {
        ...state,
        isTownList: action.payload
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
