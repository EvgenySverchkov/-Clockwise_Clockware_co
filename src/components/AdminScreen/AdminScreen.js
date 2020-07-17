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
import AddNewOrderForm from "./AddNewOrderForm"

import { SERVERDOMAIN } from "../../services/serverUrls";

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
  function getMastersAndTownsFromServerToState(){
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
      getTownsFromServerToState();
  }
  function getOrdersFromServerToState(){
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/orders`, { headers })
    .then((json) => json.json())
    .then((data) => props.initOrders(data));
  }
  function getTownsFromServerToState(){
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => props.townsInit(data));
  }
  function editMasterHandler(e, newMasterObj) {
    e.preventDefault();
    props.changeEditFormIsLoad(true);
    putDataToServer(
      `${SERVERDOMAIN}/masters/put/${newMasterObj.id}`,
      newMasterObj
    )
      .then((data) => {
        props.changeEditFormIsLoad(false);
        if(data.success){
          alert(data.msg);
          props.updateMasterInState(data);
          props.history.push("/admin/mastersList");
        }else{
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  function editTownHandler(e, newTownObj) {
    e.preventDefault();
      props.changeEditFormIsLoad(true);
      putDataToServer(`${SERVERDOMAIN}/towns/put/${newTownObj.id}`, newTownObj)
        .then((data) => {
          props.changeEditFormIsLoad(false);
          if(data.success){
            alert(data.msg)
            props.updateTownInState(data);
            props.history.push("/admin/townsList");
          }else{
            alert(data.msg)
          }
        })
        .catch((err) => alert(err));
  }
  function editOrderHandler(e, newOrderObj) {
    e.preventDefault();
    props.changeEditFormIsLoad(true);
    putDataToServer(`${SERVERDOMAIN}/orders/put/${newOrderObj.id}`, newOrderObj)
      .then((data) => {
        props.changeEditFormIsLoad(false);
        if(data.success){
          alert(data.msg);
          props.updateOrderInState(data);
          props.history.push("/admin/ordersList");
        }else{
          alert(data.msg)
        }
      })
      .catch((err) => alert(err));
  }

  function deleteMasterById(masterId) {
    deleteDataFromServer(`${SERVERDOMAIN}/masters/delete/${masterId}`)
      .then((data) => {
        if(data.success){
          props.deleteMasterFromState(data.payload)
          alert(data.msg)
        }else{
          alert(data.msg)
        }
      })
      .catch((err) => alert(err));
  }
  function deleteTownById(townId) {
    deleteDataFromServer(`${SERVERDOMAIN}/towns/delete/${townId}`)
      .then((data) => {
        if(data.success){
          props.deleteTownFromState(data.payload);
          alert(data.msg);
        }else{
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  function deleteOrderById(orderId) {
    deleteDataFromServer(`${SERVERDOMAIN}/orders/delete/${orderId}`)
      .then((data) => {
        if(data.success){
          props.deleteOrderFromState(data.payload);
          alert(data.msg);
        }else{
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="container pt-3">
      {props.isAuth ? <NavMenu /> : <AuthForm {...props}/>}
      <div className="row justify-content-sm-center">
        <div className="col-md-8">
          <Switch>
            <Route
              path="/admin/ordersList"
              render={(prop) => {
                return (
                  <List
                    dataArr={props.ordersArr}
                    deleteAction={deleteOrderById}
                    mainRows={["name", "time", "date", "town"]}
                    getData = {getOrdersFromServerToState}
                    {...prop}
                  />
                )
              }}
            />
            <Route
              path="/admin/mastersList"
              render={(prop) => {
                return (
                  <List
                    dataArr={props.mastersArr}
                    deleteAction={deleteMasterById}
                    mainRows={["name", "rating"]}
                    getData = {getMastersAndTownsFromServerToState}
                    {...prop}
                  />
                )
              }}
            />
            <Route
              path="/admin/townsList"
              render={(prop) => {
                return (
                  <List
                    dataArr={props.townsArr}
                    deleteAction={deleteTownById}
                    mainRows={["name", "id"]}
                    getData = {getTownsFromServerToState}
                    {...prop}
                  />
                )
              }}
            />
            <Route 
              path="/admin/addOrderForm"
              render={(props)=><AddNewOrderForm {...props}/>}/>
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
