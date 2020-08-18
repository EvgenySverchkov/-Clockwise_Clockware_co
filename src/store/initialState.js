import { initialStateOrders } from "./adminPanel/orders/initialState";
import { initialStateMasters } from "./adminPanel/masters/initialState";
import { initialStateTowns } from "./adminPanel/towns/initialState";
import { initialStateServices } from "./adminPanel/services/initialState";

import { initialStateClientData } from "./clientSide/data/initialState";
import { initialStateClientServices } from "./clientSide/services/initialState";
import { initialStateClientTowns } from "./clientSide/towns/initialState";

export const initialState = {
  mainAdminPanelReduser: initialStateServices,
  ordersReducer: initialStateOrders,
  masterReducer: initialStateMasters,
  townReduser: initialStateTowns,
  clientTownsReduser: initialStateClientTowns,
  clientServices: initialStateClientServices,
  clientOrderReduser: initialStateClientData,
};
