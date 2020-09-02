import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import Context from "./ContextComponent";

import ClientScreen from "./pages/ClientScreen";
import AdminScreen from "./pages/AdminScreen";

import SuccessWindow from "./components/SuccessWindow";
import ErrorWindow from "./components/ErrorWindow";

import store from "./store";

import "./App.scss";

function App() {
  useEffect(() => {
    document.title = "Clockwise Clockware Co.";
  }, []);
  const [state, setState] = useState({
    successWindowIsOpen: false,
    successWindowMsg: "",
    errorWindowIsOpen: false,
    errorWindowMsg: "",
    isOpenWarningTooltip: false,
    warningTooltipMsg: "",
    fieldIdForTooltip: ""
  });

  const valuesForProvider = {
    closeSuccessWindow: ()=>setState({...state, successWindowIsOpen: false}),
    openSuccessWindowWithMsg: (msg)=>setState({...state, successWindowIsOpen: true, successWindowMsg: msg}),
    closeErrorWindow: ()=>setState({...state, errorWindowIsOpen: false}),
    openErrorWindowWithMsg: (msg)=>setState({...state, errorWindowIsOpen: true, errorWindowMsg: msg}),
    successWindowMsg: state.successWindowMsg,
    successWindowIsOpen: state.successWindowIsOpen,
    errorWindowIsOpen: state.errorWindowIsOpen,
    errorWindowMsg: state.errorWindowMsg,
    isOpenWarningTooltip: state.isOpenWarningTooltip,
    openWarningTooltip: (msg, fieldId)=>setState({...state, isOpenWarningTooltip: true, warningTooltipMsg: msg, fieldIdForTooltip: fieldId}),
    closeWrningTooltip: ()=>setState({...state, isOpenWarningTooltip: false}),
    warningTooltipMsg: state.warningTooltipMsg,
    idForTooltip: state.fieldIdForTooltip
  }
  return (
    <Provider store={store}>
      <Context.Provider value = {valuesForProvider}>
        <div className="App">
          <Switch>
            <Route path="/client" component={ClientScreen} />
            <Route path="/admin" component={AdminScreen} />
            <Redirect exact to="/client" from="/" />
          </Switch>
          <button
            className="callModalBtn"
            data-toggle="modal"
            data-target="#warningModal"
            id="callWarningModalBtn"
          ></button>
        </div>
        <SuccessWindow/>
        <ErrorWindow/>
      </Context.Provider>
    </Provider>
  );
}

export default App;
