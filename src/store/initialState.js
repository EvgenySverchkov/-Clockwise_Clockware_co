import { initialStateOrders } from "./ordersManagement/initialState";
import { initialStateMasters } from "./masterManagement/initialState";
import { initialStateTowns } from "./townsManagement/initialState";
import { initialStateAdminModalWindows } from "./adminModalWindows/initialState";

import { initialStateClientOrders } from "./orders/initialState";
import { initialClientModalsWindows } from "./clientModalWindows/initialState";
import { initialStateClientMasters } from "./masters/initialState";
import { initialStateClientTowns } from "./towns/initialState";
import { initialUserProfileReducer } from "./userProfile/initialState";

import { initialStateAuth } from "./auth/initialState";
 
export const initialState = {
  adminModalWindows: initialStateAdminModalWindows,
  ordersReducer: initialStateOrders,
  masterReducer: initialStateMasters,
  townReduser: initialStateTowns,
  clientModalWindows: initialClientModalsWindows,
  clientOrderReduser: initialStateClientOrders,
  clientMastresReduser: initialStateClientMasters,
  clientTownsReduser: initialStateClientTowns,
  authReducer: initialStateAuth,
  userProfileReducer: initialUserProfileReducer
};
