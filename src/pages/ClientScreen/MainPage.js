import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { addCurrentOrderToState } from "../../store/ordersManagement/actions";
import { toogleAuthClient } from "../../store/auth/actions";
import OrderPage from "./OrderPage";
import FreeMastersPage from "./FreeMastersPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import UserProfilePage from "./UserProfilePage";
import Header from "../../components/ClientScreen/Header";
import FullInfoModal from "../../components/AdminScreen/FullInfoModal";

function ClientSrcreen() {
  const state = useSelector((state) => {
    return {
      currItemForModal: state.adminModalWindows.currItemForModal,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(
        addCurrentOrderToState({
          email: JSON.parse(localStorage.getItem("user")).email,
        })
      );
      dispatch(toogleAuthClient(true));
    } else {
      dispatch(toogleAuthClient(false));
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
          <Route path="/client/userProfile" component={UserProfilePage} />
        </Switch>
        <FullInfoModal itemObj={state.currItemForModal} />
      </div>
    </>
  );
}

export default ClientSrcreen;
