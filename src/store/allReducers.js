import { combineReducers } from "redux";

import masterReducer from "./masterManagement/reducers";
import ordersReducer from "./ordersManagement/reducers";
import townReduser from "./townsManagement/reducers";
import adminModalWindows from "./adminModalWindows/reducers";

import userProfileReducer from "./userProfile/redusers";

import authReducer from "./auth/reducers";

export default combineReducers({
  masterReducer,
  ordersReducer,
  townReduser,
  adminModalWindows,
  authReducer,
  userProfileReducer,
});
