import { combineReducers } from "redux";
import master_reducer from "./adminPanel/masters/reducers";
import orders_reducer from "./adminPanel/orders/reducers";
import town_reduser from "./adminPanel/towns/reducers";
import main_adminPanel_reduser from "./adminPanel/services/reducers";

import client_services from "./clientSide/services/reducers";
import client_order_reduser from "./clientSide/data/reducers";
import client_towns_reduser from "./clientSide/towns/reducers";

export default combineReducers({
  master_reducer,
  orders_reducer,
  town_reduser,
  main_adminPanel_reduser,
  client_order_reduser,
  client_services,
  client_towns_reduser
});
