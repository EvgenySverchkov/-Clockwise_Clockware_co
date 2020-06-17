import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./services/reducers/index";

import ClientScreen from "./components/ClientScreen";
import AdminScreen from "./components/AdminScreen";
import FirstScreen from "./components/FirstScreen";
import './App.css';

const initialState = {
  // clients: [],
  master_reducer: {
    masters:[],
    towns:["Dnipro", "Uzhorod"],
    isAddMaster: false,
  }
};
const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={FirstScreen}/>
          <Route path="/client" component={ClientScreen} />
          <Route path="/admin" component={AdminScreen}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
