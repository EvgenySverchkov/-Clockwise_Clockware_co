import { combineReducers } from "redux";
import masterReducer from "./adminPanel/masters/reducers";
import ordersReducer from "./adminPanel/orders/reducers";
import townReduser from "./adminPanel/towns/reducers";
import mainAdminPanelReduser from "./adminPanel/services/reducers";

import clientServices from "./clientSide/services/reducers";
import clientOrderReduser from "./clientSide/data/reducers";
import clientTownsReduser from "./clientSide/towns/reducers";

export default combineReducers({
  masterReducer,
  ordersReducer,
  townReduser,
  mainAdminPanelReduser,
  clientOrderReduser,
  clientServices,
  clientTownsReduser,
});
