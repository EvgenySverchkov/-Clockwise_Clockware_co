import { combineReducers } from "redux";
import master_reducer from "./adminPanel/reducers/master_reduser";
import orders_reducer from "./adminPanel/reducers/orders_reducer";
import town_reduser from "./adminPanel/reducers/town_reduser";
import main_adminPanel_reduser from "./adminPanel/reducers/main_adminPanel_reduser";
import client_order_reduser from "./clientSide/reducer";

export default combineReducers({
  master_reducer,
  orders_reducer,
  town_reduser,
  client_order_reduser,
  main_adminPanel_reduser,
});
