import { combineReducers } from "redux";
import master_reducer from "./master_reduser";
import client_reduser from "./client_reduser";
import town_reduser from "./town_reduser";

export default combineReducers({
  master_reducer,
  client_reduser,
  town_reduser,
});
