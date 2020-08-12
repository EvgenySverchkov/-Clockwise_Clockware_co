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
import FreeMastersPage from "./FreeMastersPage";
import SuccessModal from "../SuccessModal";
import WarningModal from "../WarningModal";

function AdminSrcreen(props) {
  const state = useSelector(state=>{
    return {
      currItemForModal: state.main_adminPanel_reduser.currItemForModal,
      isAuth: state.main_adminPanel_reduser.isAuth,
      currentOrder: state.orders_reducer.currentOrder,
      suitableMasters: state.orders_reducer.suitableMasters,
      modalDataAdmin: state.main_adminPanel_reduser.modalDataAdmin,
      modalWarningDataAdmin: state.main_adminPanel_reduser.modalWarningDataAdmin,
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
              component={OrdersList}
            />
            <Route
              path="/admin/mastersList"
              component={MastersList}
            />
            <Route
              path="/admin/townsList"
              component={TownsList}
            />
            <Route
              path="/admin/addOrderForm"
              component={AddNewOrderForm}
            />
            <Route
              path="/admin/addMasterForm"
              component={AddMasterForm}
            />
            <Route
              path="/admin/addTownForms"
              component={AddNewTownForm}
            />
            <Route
              path="/admin/editMaster/:id"
              component={EditMasterForm}
            />
            <Route
              path="/admin/editTown/:id"
              component={EditTownForm}
            />
            <Route
              path="/admin/editOrder/:id"
              component={EditOrderForm}
            />
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
        <SuccessModal history = {props.history} data = {state.modalDataAdmin}/>
        <WarningModal data = {state.modalWarningDataAdmin}/>
      </div>
    </div>
  );
}

AdminSrcreen.propTypes = {
  history: PropTypes.object
};

export default AdminSrcreen;
