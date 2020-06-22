import React from 'react';
import {Route, Switch} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/adminPanel/reducers";

import ClientScreen from "./components/ClientScreen";
import AdminScreen from "./components/AdminScreen";
import FirstScreen from "./components/FirstScreen";

import './App.css';

const initialState = {
  client_reduser:{
    clients: [
      {id: 1,
       name: "Valery",
       email:"some@mail.com",
       clockSize: "middle",
       town: "Dnipro",
       time:"01-01-2021 15:00"}
     ],
  },
  master_reducer: {
    masters:[],
  },
  town_reduser:{
    towns:[],
  }
};
const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
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
