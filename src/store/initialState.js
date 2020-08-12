import { initialStateOrders } from "./adminPanel/orders/initialState";
import { initialStateMasters } from "./adminPanel/masters/initialState";
import { initialStateTowns } from "./adminPanel/towns/initialState";
import { initialStateServices } from "./adminPanel/services/initialState";

import { initialStateClientData } from "./clientSide/data/initialState";
import { initialStateClientServices } from "./clientSide/services/initialState";
import { initialStateClientTowns } from "./clientSide/towns/initialState";

export const initialState = {
  main_adminPanel_reduser: initialStateServices,
  orders_reducer: initialStateOrders,
  master_reducer: initialStateMasters,
  town_reduser: initialStateTowns,
  client_towns_reduser: initialStateClientTowns,
  client_services: initialStateClientServices,
  client_order_reduser: initialStateClientData,
};
