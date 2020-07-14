import React, {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/allReducers.js";

import ClientScreen from "./components/ClientScreen";
import AdminScreen from "./components/AdminScreen";
import FirstScreen from "./components/FirstScreen";

import './App.css';

const initialState = {
  main_adminPanel_reduser:{
    currItemForModal: {},
    isAuth: false
  },
  orders_reducer:{
    ordersArr: []
  },
  master_reducer: {
    masters:[],
  },
  town_reduser:{
    towns:[],
  },
  client_order_reduser:{
    currentOrder: {},
    suitableMasters: [],
    ordersArr: [],
    bookedMasters: [],
    loginIsLoad: false,
    signUpIsLoad: false,
    orderFormIsLoad: false,
    masterListIsLoad: false
  }
};
const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  useEffect(()=>{
    document.title = "Clockwise Clockware Co.";
  },[]);
  return (
    <Provider store = {store}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={FirstScreen}/>
          <Route path="/client" component={ClientScreen} />
          <Route path="/admin" component={AdminScreen}/>
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
