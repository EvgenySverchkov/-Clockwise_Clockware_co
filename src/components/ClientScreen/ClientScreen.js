import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import {
  addCurrentOrderToState,
  addOrdersToState,
  toggleAuth,
  addTownsToState,
} from "../../store/clientSide/actions";
import OrderFormClient from "./OrderFormClient";
import MastersList from "./MastersList";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Header from "./Header";

import { SERVERDOMAIN } from "../../services/serverUrls";

function ClientSrcreen(props) {
  useEffect(() => {
    fetch(`${SERVERDOMAIN}/townsClient`)
      .then((json) => json.json())
      .then((data) => props.addTownsToState(data));

    if (localStorage.getItem("user")) {
      props.addCurrentOrderToState({
        email: JSON.parse(localStorage.getItem("user")).email,
      });
      props.toggleAuth(true);
    } else {
      props.toggleAuth(false);
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
            render={(props) => <OrderFormClient {...props} />}
          />
          <Route
            path="/client/masters"
            render={(props) => <MastersList {...props} />}
          />
          <Route
            path="/client/login"
            render={(props) => <LoginForm {...props} />}
          />
          <Route
            path="/client/registration"
            render={(props) => <RegistrationForm {...props} />}
          />
        </Switch>
      </div>
    </>
  );
}

let actions = {
  addTownsToState,
  addOrdersToState,
  addCurrentOrderToState,
  toggleAuth,
};

ClientSrcreen.propTypes = {
  addTownsToState: PropTypes.func,
  addOrdersToState: PropTypes.func,
  addCurrentOrderToState: PropTypes.func,
  toggleAuth: PropTypes.func,
};

export default connect(null, actions)(ClientSrcreen);
