import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  changeAddMewOrderFormIsLoad,
  addCurrentOrderToState,
  townsInit,
  addSuitableMasters,
  changeOrderFormIsLoad
} from "../../store/adminPanel/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import OrderForm from "../OrderForm";

function OrderFormAdmin({
  currentOrder, 
  addCurrentOrderToState, 
  townsArr, 
  townsInit, 
  history, 
  addSuitableMasters,
  changeOrderFormIsLoad,
  orderFormIsLoad}) {
  useEffect(function(){
    getTownsFromServerToState();
  }, []);
  function changeHandler(e) {
    let idx = e.target.name;
    addCurrentOrderToState({
      ...currentOrder,
      [idx]: e.target.value,
    });
  }
  function getTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => townsInit(data));
  }
  function submitHandler(e) {
    e.preventDefault();
    let trgElem = e.target;
    if (!trgElem.town.value || !trgElem.size.value || !trgElem.name.value || !trgElem.email.value || !trgElem.time.value || !trgElem.date.value) {
      alert("Please, filling all gaps!!!");
      return false;
    }

    let endOrderTime;
    let clientTimeHour = +currentOrder.time.match(/\d\d/);
    let clientTimeMin = currentOrder.time.match(/:\d\d$/);
    switch (currentOrder.size) {
      case "small":
        endOrderTime = clientTimeHour + 1 + clientTimeMin;
        break;
      case "middle":
        endOrderTime = clientTimeHour + 2 + clientTimeMin;
        break;
      case "large":
        endOrderTime = clientTimeHour + 3 + clientTimeMin;
        break;
      default:
        endOrderTime = 0;
    }
    changeOrderFormIsLoad(true);
    getFreeMastersByClientTownFromServer(
      SERVERDOMAIN,
      trgElem.town.value,
      currentOrder.time,
      endOrderTime,
      currentOrder.date
    ).then((data) => {
      changeOrderFormIsLoad(false);
      console.log(data);
      addSuitableMasters(data);
      history.push("/admin/freeMasters");
    });
  }
  function getFreeMastersByClientTownFromServer(
    url,
    clientTown,
    clientTimeStart,
    clientTimeEnd,
    clientDate
  ) {
    let obj = {
      town: clientTown,
      timeStart: clientTimeStart,
      timeEnd: clientTimeEnd,
      date: clientDate,
    };
    return fetch(`${url}/freeMasters`, {
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("token")? "Bearer " + sessionStorage.getItem("token") : "",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    }).then((json) => json.json());
  }
  return (
    <OrderForm 
      currentOrder={currentOrder} 
      changeHandler = {changeHandler} 
      townsArr={townsArr} 
      submitHandler={submitHandler}
      orderFormIsLoad={orderFormIsLoad}
    />
  );
}
function mapStateToProps(state) {
  return {
    currentOrder: state.orders_reducer.currentOrder,
    townsArr: state.town_reduser.towns,
    orderFormIsLoad: state.orders_reducer.orderFormIsLoad
  };
}

const actions = {
  changeAddMewOrderFormIsLoad,
  addCurrentOrderToState,
  townsInit,
  addSuitableMasters,
  changeOrderFormIsLoad
};

OrderForm.propTypes = {
  currentOrder: PropTypes.object,
  submitHandler: PropTypes.func,
  townsArr: PropTypes.array,
  addCurrentOrderToState: PropTypes.func,
};

export default connect(mapStateToProps, actions)(OrderFormAdmin);
