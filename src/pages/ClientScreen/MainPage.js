import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { addCurrentOrderToState } from "../../store/clientSide/data/actions";
import { toggleAuth } from "../../store/clientSide/services/actions";
import OrderPage from "./OrderPage";
import FreeMastersPage from "./FreeMastersPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Header from "../../components/ClientScreen/Header";
import SuccessModal from "../SuccessModal";
import WarningModal from "../WarningModal";

function ClientSrcreen({ history }) {
  const state = useSelector((state) => {
    return {
      modalSuccesData: state.client_services.modalSuccesData,
      modalWarningData: state.client_services.modalWarningData,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "";

    if (localStorage.getItem("user")) {
      dispatch(
        addCurrentOrderToState({
          email: JSON.parse(localStorage.getItem("user")).email,
        })
      );
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
          <Route exact path="/client" component={OrderPage} />
          <Route path="/client/masters" component={FreeMastersPage} />
          <Route path="/client/login" component={LoginPage} />
          <Route path="/client/registration" component={SignUpPage} />
        </Switch>
        <SuccessModal history={history} data={state.modalSuccesData} />
        <WarningModal data={state.modalWarningData} />
      </div>
    </>
  );
}

export default ClientSrcreen;
