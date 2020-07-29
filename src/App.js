import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/allReducers.js";

import ClientScreen from "./components/ClientScreen";
import AdminScreen from "./components/AdminScreen";

import "./App.css";

const initialState = {
  main_adminPanel_reduser: {
    currItemForModal: {},
    isAuth: false,
    authIsLoad: false,
    newTownFormIsLoad: false,
    newMasterFormIsLoad: false,
    newOrderFormIsLoad: false,
    editFormIsLoad: false,
  },
  orders_reducer: {
    ordersArr: [],
    currentOrder: {},
    suitableMasters: [],
    orderFormIsLoad: false,
  },
  master_reducer: {
    masters: [],
    masterListIsLoad: false,
  },
  town_reduser: {
    towns: [],
  },
  client_order_reduser: {
    currentOrder: {},
    townsArr: [],
    suitableMasters: [],
    ordersArr: [],
    bookedMasters: [],
    loginIsLoad: false,
    signUpIsLoad: false,
    orderFormIsLoad: false,
    masterListIsLoad: false,
  },
};
const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App(props) {
  useEffect(() => {
    document.title = "Clockwise Clockware Co.";
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route path="/client" component={ClientScreen} />
          <Route path="/admin" component={AdminScreen} />
          <Redirect exact to="/client" from="/" />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
