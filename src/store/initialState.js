import { initialStateOrders } from "./ordersManagement/initialState";
import { initialStateMasters } from "./masterManagement/initialState";
import { initialStateTowns } from "./townsManagement/initialState";
import { initialStateAdminModalWindows } from "./adminModalWindows/initialState";

import { initialUserProfileReducer } from "./userProfile/initialState";

import { initialStateAuth } from "./auth/initialState";

export const initialState = {
  adminModalWindows: initialStateAdminModalWindows,
  ordersReducer: initialStateOrders,
  masterReducer: initialStateMasters,
  townReduser: initialStateTowns,
  authReducer: initialStateAuth,
  userProfileReducer: initialUserProfileReducer,
};
