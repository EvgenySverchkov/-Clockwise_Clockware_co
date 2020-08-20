import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBtnGroup from "../../components/UserProfile/NavBtnGroup";
import UserOrdersList from "../../components/UserProfile/UserOrdersList";
import UserSettings from "../../components/UserProfile/UserSettings";

const UserProfilePage = () => {
  if (localStorage.getItem("token")) {
    return (
      <>
        <NavBtnGroup />
        <Switch>
          <Route
            path="/client/userProfile/userOrders"
            component={UserOrdersList}
          />
          <Route
            path="/client/userProfile/userSettings"
            component={UserSettings}
          />
        </Switch>
      </>
    );
  } else {
    return (
      <div className="text-center display-4">
        Please, log into your account!
      </div>
    );
  }
};

export default UserProfilePage;
