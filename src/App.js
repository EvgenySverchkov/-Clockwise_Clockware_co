import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import ClientScreen from "./pages/ClientScreen";
import AdminScreen from "./pages/AdminScreen";

import store from "./store"

import "./App.scss";

function App() {
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
        <button
          className = "callModalBtn"
          data-toggle="modal"
          data-target="#successModal"
          id="callSuccessModalBtn"
        ></button>
        <button
          className = "callModalBtn"
          data-toggle="modal"
          data-target="#warningModal"
          id="callWarningModalBtn"
        ></button>
      </div>
    </Provider>
  );
}

export default App;
