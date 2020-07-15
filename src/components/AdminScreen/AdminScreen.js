import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import putDataToServer from "./services/putDataToServer";
import deleteDataFromServer from "./services/deleteDataFromServer";

import {
  initMasters,
  townsInit,
  initOrders,
  updateMasterInState,
  updateTownInState,
  updateOrderInState,
  deleteMasterFromState,
  deleteTownFromState,
  deleteOrderFromState,
  toogleAuth,
  changeAuthIsLoad,
  changeAddMewTownFormIsLoad,
  changeAddNewMasterFormIsLoad,
  changeEditFormIsLoad
} from "../../store/adminPanel/actions";
import "./adminScreen.css";

import NavMenu from "./NavMenu";
import AddNewTownForm from "./AddNewTownForm";
import AddMasterForm from "./AddMasterForm";
import EditForm from "./EditForm";
import List from "./List";
import FullInfoModal from "./FullInfoModal";
import AuthForm from "./AuthForm";

import { SERVERDOMAIN } from "../../services/serverUrls";

function AdminSrcreen(props) {
  useEffect(function () {
    document.title = "AdminPanel - Clockwise Clockware";
    if (sessionStorage.getItem("token")) {
      props.toogleAuth(true);
      getAllData();
    } else {
      props.history.push("/admin");
      props.initMasters([]);
      props.townsInit([]);
      props.initOrders([]);
    }
  }, []);

  function getAllData() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/masters`, { headers })
      .then((data) => data.json())
      .then((data) => props.initMasters(data))
      .catch((err) => {
        alert("Авторизируйтесь");
        props.initMasters([]);
      });

    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => props.townsInit(data));

    fetch(`${SERVERDOMAIN}/orders`, { headers })
      .then((json) => json.json())
      .then((data) => props.initOrders(data));
  }

  function editMasterHandler(e, newMasterObj) {
    e.preventDefault();
    for (let key in newMasterObj) {
      if (!newMasterObj[key]) {
        alert("Please filling all gaps");
        return false;
      }
    }
    props.changeEditFormIsLoad(true);
    putDataToServer(
      `${SERVERDOMAIN}/masters/put/${newMasterObj.id}`,
      newMasterObj
    )
      .then((data) => {
        props.changeEditFormIsLoad(false);
        props.updateMasterInState(data);
        props.history.push("/admin/mastersList");
      })
      .catch((err) => alert(err));
  }
  function editTownHandler(e, newTownObj) {
    e.preventDefault();
    for (let key in newTownObj) {
      if (!newTownObj[key]) {
        alert("Please filling all gaps");
        return false;
      }
    }
    if (
      props.townsArr.find(
        (item) => item.name.toLowerCase() === newTownObj.name.toLowerCase()
      )
    ) {
      alert(
        "The name of this town is already on the list! \nPlease enter another town name!"
      );
    } else {
      props.changeEditFormIsLoad(true);
      putDataToServer(`${SERVERDOMAIN}/towns/put/${newTownObj.id}`, newTownObj)
        .then((data) => {
          props.changeEditFormIsLoad(false);
          props.updateTownInState(data);
          props.history.push("/admin/townsList");
        })
        .catch((err) => alert(err));
    }
  }
  function editOrderHandler(e, newOrderObj) {
    e.preventDefault();
    for (let key in newOrderObj) {
      if (!newOrderObj[key]) {
        alert("Please filling all gaps");
        return false;
      }
    }
    props.changeEditFormIsLoad(true);
    putDataToServer(`${SERVERDOMAIN}/orders/put/${newOrderObj.id}`, newOrderObj)
      .then((data) => {
        props.changeEditFormIsLoad(false);
        props.updateOrderInState(data);
        props.history.push("/admin/ordersList");
      })
      .catch((err) => alert(err));
  }

  function deleteMasterById(masterId) {
    deleteDataFromServer(`${SERVERDOMAIN}/masters/delete/${masterId}`)
      .then((data) => props.deleteMasterFromState(data))
      .catch((err) => alert(err));
  }
  function deleteTownById(townId) {
    deleteDataFromServer(`${SERVERDOMAIN}/towns/delete/${townId}`)
      .then((data) => props.deleteTownFromState(data))
      .catch((err) => alert(err));
  }
  function deleteOrderById(orderId) {
    deleteDataFromServer(`${SERVERDOMAIN}/orders/delete/${orderId}`)
      .then((data) => props.deleteOrderFromState(data))
      .catch((err) => alert(err));
  }

  return (
    <div className="container pt-3">
      {props.isAuth ? <NavMenu /> : <AuthForm {...props} getAllData={getAllData}/>}
      <div className="row justify-content-sm-center">
        <div className="col-md-8">
          <Switch>
            <Route
              path="/admin/ordersList"
              render={() => (
                <List
                  dataArr={props.ordersArr}
                  deleteAction={deleteOrderById}
                  mainRows={["name", "time", "date", "town"]}
                />
              )}
            />
            <Route
              path="/admin/mastersList"
              render={() => (
                <List
                  dataArr={props.mastersArr}
                  deleteAction={deleteMasterById}
                  mainRows={["name", "rating"]}
                />
              )}
            />
            <Route
              path="/admin/townsList"
              render={() => (
                <List
                  dataArr={props.townsArr}
                  deleteAction={deleteTownById}
                  mainRows={["name", "id"]}
                />
              )}
            />
            <Route
              path="/admin/addMasterForm"
              render={(props) => <AddMasterForm {...props}/>}
            />
            <Route
              path="/admin/addTownForms"
              render={(props) => <AddNewTownForm {...props} />}
            />
            <Route
              path="/admin/editMaster/:id"
              render={(matchProps) => (
                <EditForm
                  id={+matchProps.match.params.id}
                  handler={editMasterHandler}
                  arrFromState={props.mastersArr}
                />
              )}
            />
            <Route
              path="/admin/editTown/:id"
              render={(matchProps) => (
                <EditForm
                  id={+matchProps.match.params.id}
                  handler={editTownHandler}
                  arrFromState={props.townsArr}
                />
              )}
            />
            <Route
              path="/admin/editOrder/:id"
              render={(matchProps) => (
                <EditForm
                  id={+matchProps.match.params.id}
                  handler={editOrderHandler}
                  arrFromState={props.ordersArr}
                />
              )}
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
    mastersArr: state.master_reducer.masters,
    townsArr: state.town_reduser.towns,
    ordersArr: state.orders_reducer.ordersArr,
    currItemForModal: state.main_adminPanel_reduser.currItemForModal,
    isAuth: state.main_adminPanel_reduser.isAuth,
  };
}
const actions = {
  initMasters,
  townsInit,
  initOrders,
  deleteMasterFromState,
  deleteTownFromState,
  deleteOrderFromState,
  updateOrderInState,
  updateMasterInState,
  updateTownInState,
  toogleAuth,
  changeAuthIsLoad,
  changeAddMewTownFormIsLoad,
  changeAddNewMasterFormIsLoad,
  changeEditFormIsLoad
};

AdminSrcreen.propTypes = {
  initMasters: PropTypes.func,
  townsInit: PropTypes.func,
  updateMasterInState: PropTypes.func,
  updateTownInState: PropTypes.func,
  deleteMasterFromState: PropTypes.func,
  deleteTownFromState: PropTypes.func,
  initOrders: PropTypes.func,
  deleteOrderFromState: PropTypes.func,
  updateOrderInState: PropTypes.func,
  mastersArr: PropTypes.array,
  townsArr: PropTypes.array,
  ordersArr: PropTypes.array,
};

export default connect(mapStateToProps, actions)(AdminSrcreen);
