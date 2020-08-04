import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import {addCurrentOrderToState} from "../../store/clientSide/data/actions";
import {toggleAuth} from "../../store/clientSide/services/actions";
import OrderPage from "./OrderPage";
import FreeMastersPage from "./FreeMastersPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Header from "../../components/ClientScreen/Header";

function ClientSrcreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "";

    if (localStorage.getItem("user")) {
      dispatch(addCurrentOrderToState({
        email: JSON.parse(localStorage.getItem("user")).email,
      }));
      dispatch(toggleAuth(true));
    } else {
      dispatch(toggleAuth(false));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="col-md-8 mt-4 container">
        <Switch>
          <Route
            exact
            path="/client"
            render={(props) => <OrderPage {...props} />}
          />
          <Route
            path="/client/masters"
            render={(props) => <FreeMastersPage {...props} />}
          />
          <Route
            path="/client/login"
            render={(props) => <LoginPage {...props} />}
          />
          <Route
            path="/client/registration"
            render={(props) => <SignUpPage {...props} />}
          />
        </Switch>
      </div>
    </>
  );
}

export default ClientSrcreen;
