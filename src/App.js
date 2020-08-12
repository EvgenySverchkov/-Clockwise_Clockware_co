import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/allReducers.js";

import ClientScreen from "./pages/ClientScreen";
import AdminScreen from "./pages/AdminScreen";

import {initialState} from "./store/initialState";

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
        <button data-toggle="modal" data-target="#successModal" id="callSuccessModalBtn" style={{display: "none"}}></button>
        <button data-toggle="modal" data-target="#warningModal" id="callWarningModalBtn" style={{display: "none"}}></button>
      </div>
    </Provider>
  );
}

export default App;
