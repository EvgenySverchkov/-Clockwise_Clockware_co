import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { toogleAuthAdmin } from "../../store/auth/actions";
import { townsInit } from "../../store/townsManagement/actions";
import { initMasters } from "../../store/masterManagement/actions";
import { initOrders } from "../../store/ordersManagement/actions";
import NavMenu from "../../components/AdminScreen/NavMenu";

import MastersList from "../../components/AdminScreen/ItemsLists/MastersList";
import OrdersList from "../../components/AdminScreen/ItemsLists/OrdersList";
import TownsList from "../../components/AdminScreen/ItemsLists/TownsList";

import AddNewTownPage from "./AddNewTownPage";
import AddMasterPage from "./AddMasterPage";
import AddNewOrderPage from "./AddNewOrderPage";

import EditMasterForm from "../../forms/EditMasterForm";
import EditOrderForm from "../../forms/EditOrderForm";
import EditTownForm from "../../forms/EditTownForm";

import FullInfoModal from "../../components/AdminScreen/FullInfoModal";
import LoginPage from "./LoginPage";
import FreeMastersPage from "./FreeMastersPage";

function AdminSrcreen(props) {
  const state = useSelector((state) => {
    return {
      currItemForModal: state.adminModalWindows.currItemForModal,
      isAuth: state.authReducer.isAuthAdmin,
      currentOrder: state.ordersReducer.currentOrder,
      suitableMasters: state.ordersReducer.suitableMasters,
    };
  });
  const dispatch = useDispatch();

  useEffect(function () {
    document.title = "AdminPanel - Clockwise Clockware";
    if (sessionStorage.getItem("token")) {
      dispatch(toogleAuthAdmin(true));
    } else {
      props.history.push("/admin");
      dispatch(initMasters([]));
      dispatch(townsInit([]));
      dispatch(initOrders([]));
    }
  }, []);
  return (
    <div className="container pt-3">
      {state.isAuth ? (
        <>
        <NavMenu />
        <div className="row justify-content-sm-center">
        <div className="col-md-8">
          <Switch>
            <Route path="/admin/ordersList" component={OrdersList} />
            <Route path="/admin/mastersList" component={MastersList} />
            <Route path="/admin/townsList" component={TownsList} />
            <Route path="/admin/addOrderForm" component={AddNewOrderPage} />
            <Route path="/admin/addMasterForm" component={AddMasterPage} />
            <Route path="/admin/addTownForms" component={AddNewTownPage} />
            <Route path="/admin/editMaster/:id" component={EditMasterForm} />
            <Route path="/admin/editTown/:id" component={EditTownForm} />
            <Route path="/admin/editOrder/:id" component={EditOrderForm} />
            <Route
              path="/admin/freeMasters"
              render={(prop) => {
                return (
                  <FreeMastersPage
                    {...prop}
                    currentOrder={state.currentOrder}
                    isAuth={state.isAuth}
                    suitableMasters={state.suitableMasters || []}
                    backTo="/admin/addOrderForm"
                  />
                );
              }}
            />
          </Switch>
        </div>
        <FullInfoModal itemObj={state.currItemForModal} />
      </div>
        </>
      ) : <LoginPage {...props} />}
    </div>
  );
}

AdminSrcreen.propTypes = {
  history: PropTypes.object,
};

export default AdminSrcreen;
