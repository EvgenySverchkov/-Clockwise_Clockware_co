import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  initMasters,
  townsInit,
  initOrders,
  toogleAuth,
} from "../../store/adminPanel/actions";

import NavMenu from "../../components/AdminScreen/NavMenu";

import MastersList from "../../components/AdminScreen/ItemsLists/MastersList";
import OrdersList from "../../components/AdminScreen/ItemsLists/OrdersList";
import TownsList from "../../components/AdminScreen/ItemsLists/TownsList";

import AddNewTownForm from "../../forms/AddNewTownForm";
import AddMasterForm from "../../forms/AddMasterForm";
import AddNewOrderForm from "../../forms/AddNewOrderForm";

import EditMasterForm from "../../components/AdminScreen/EditForms/EditMasterForm";
import EditOrderForm from "../../components/AdminScreen/EditForms/EditOrderForm";
import EditTownForm from "../../components/AdminScreen/EditForms/EditTownForm";

import FullInfoModal from "../../components/AdminScreen/FullInfoModal";
import LoginPage from "./LoginPage";
import FreeMasters from "../../components/AdminScreen/FreeMasters";

function AdminSrcreen(props) {
  useEffect(function () {
    document.title = "AdminPanel - Clockwise Clockware";
    if (sessionStorage.getItem("token")) {
      props.toogleAuth(true);
    } else {
      props.history.push("/admin");
      props.initMasters([]);
      props.townsInit([]);
      props.initOrders([]);
    }
  }, []);
  return (
    <div className="container pt-3">
      {props.isAuth ? <NavMenu /> : <LoginPage {...props} />}
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
                    currentOrder={props.currentOrder}
                    isAuth={props.isAuth}
                    suitableMasters={props.suitableMasters || []}
                    backTo="/admin/addOrderForm"
                  />
                );
              }}
            />
          </Switch>
        </div>
        <FullInfoModal itemObj={props.currItemForModal} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currItemForModal: state.main_adminPanel_reduser.currItemForModal,
    isAuth: state.main_adminPanel_reduser.isAuth,
    currentOrder: state.orders_reducer.currentOrder,
    suitableMasters: state.orders_reducer.suitableMasters,
  };
}
const actions = {
  initMasters,
  townsInit,
  initOrders,
  toogleAuth,
};

AdminSrcreen.propTypes = {
  toogleAuth: PropTypes.func,
  history: PropTypes.object,
  initMasters: PropTypes.func,
  townsInit: PropTypes.func,
  initOrders: PropTypes.func,
  isAuth: PropTypes.bool,
  currentOrder: PropTypes.object,
  suitableMasters: PropTypes.array,
  currItemForModal: PropTypes.object,
};

export default connect(mapStateToProps, actions)(AdminSrcreen);
