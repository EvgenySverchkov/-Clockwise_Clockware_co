import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {toogleAuth} from "../../store/adminPanel/services/actions";
import {townsInit} from "../../store/adminPanel/towns/actions";
import {initMasters} from "../../store/adminPanel/masters/actions";
import {initOrders} from "../../store/adminPanel/orders/actions";
import NavMenu from "../../components/AdminScreen/NavMenu";

import MastersList from "../../components/AdminScreen/ItemsLists/MastersList";
import OrdersList from "../../components/AdminScreen/ItemsLists/OrdersList";
import TownsList from "../../components/AdminScreen/ItemsLists/TownsList";

import AddNewTownForm from "../../forms/AddNewTownForm";
import AddMasterForm from "../../forms/AddMasterForm";
import AddNewOrderForm from "../../forms/AddNewOrderForm";

import EditMasterForm from "../../forms/EditMasterForm";
import EditOrderForm from "../../forms/EditOrderForm";
import EditTownForm from "../../forms/EditTownForm";

import FullInfoModal from "../../components/AdminScreen/FullInfoModal";
import LoginPage from "./LoginPage";
import FreeMasters from "../../components/AdminScreen/FreeMasters";

function AdminSrcreen(props) {
  const state = useSelector(state=>{
    return {
      currItemForModal: state.main_adminPanel_reduser.currItemForModal,
      isAuth: state.main_adminPanel_reduser.isAuth,
      currentOrder: state.orders_reducer.currentOrder,
      suitableMasters: state.orders_reducer.suitableMasters,
    }
  });
  const dispatch = useDispatch();
  
  useEffect(function () {
    document.title = "AdminPanel - Clockwise Clockware";
    if (sessionStorage.getItem("token")) {
      dispatch(toogleAuth(true));
    } else {
      props.history.push("/admin");
      dispatch(initMasters([]));
      dispatch(townsInit([]));
      dispatch(initOrders([]));
    }
  }, []);
  return (
    <div className="container pt-3">
      {state.isAuth ? <NavMenu /> : <LoginPage {...props} />}
      <div className="row justify-content-sm-center">
        <div className="col-md-8">
          <Switch>
            <Route
              path="/admin/ordersList"
              render={(prop) => <OrdersList {...prop} />}
            />
            <Route
              path="/admin/mastersList"
              render={(prop) => <MastersList {...prop} />}
            />
            <Route
              path="/admin/townsList"
              render={(prop) => <TownsList {...prop} />}
            />
            <Route
              path="/admin/addOrderForm"
              render={(props) => <AddNewOrderForm {...props} />}
            />
            <Route
              path="/admin/addMasterForm"
              render={(props) => <AddMasterForm {...props} />}
            />
            <Route
              path="/admin/addTownForms"
              render={(props) => <AddNewTownForm {...props} />}
            />
            <Route
              path="/admin/editMaster/:id"
              render={(prop) => <EditMasterForm {...prop} />}
            />
            <Route
              path="/admin/editTown/:id"
              render={(prop) => <EditTownForm {...prop} />}
            />
            <Route
              path="/admin/editOrder/:id"
              render={(prop) => <EditOrderForm {...prop} />}
            />
            <Route
              path="/admin/freeMasters"
              render={(prop) => {
                return (
                  <FreeMasters
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
    </div>
  );
}

AdminSrcreen.propTypes = {
  history: PropTypes.object
};

export default AdminSrcreen;
