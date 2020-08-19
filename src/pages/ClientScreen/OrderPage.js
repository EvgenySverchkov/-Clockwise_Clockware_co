import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { addCurrentOrderToState } from "../../store/orders/actions";
import { addTownsToState } from "../../store/towns/actions";
import { addSuitableMasters } from "../../store/masters/actions";
import {
  changeWarningModalData,
} from "../../store/clientModalWindows/actions";

import {
  changeClientOrderFormIsLoad
} from "../../store/orders/actions"

import {changeTownsFromOrderFormIsLoad} from "../../store/towns/actions"

import { SERVERDOMAIN } from "../../services/serverUrls";

import OrderForm from "../../forms/OrderForm";

function OrderFormClient({ history }) {
  const state = useSelector((state) => {
    return {
      currentOrder: state.clientOrderReduser.currentOrder,
      orderFormIsLoad: state.clientOrderReduser.orderFormIsLoad,
      townsArr: state.clientTownsReduser.townsArr,
      townsInOrderFormIsLoad: state.clientTownsReduser.townsInOrderFormIsLoad,
    };
  });
  const dispatch = useDispatch();

  useEffect(function () {
    getTownsFromServerToState();
  }, []);
  function changeHandler(e) {
    let idx = e.target.name;
    dispatch(
      addCurrentOrderToState({
        ...state.currentOrder,
        [idx]: e.target.value,
      })
    );
  }
  function getTownsFromServerToState() {
    const headers = {
      Authorization: localStorage.getItem("token")
        ? "Bearer " + localStorage.getItem("token")
        : "",
      "Content-Type": "application/json",
    };
    dispatch(changeTownsFromOrderFormIsLoad(true));
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => {
        dispatch(addTownsToState(data));
        dispatch(changeTownsFromOrderFormIsLoad(false));
      });
  }
  function submitHandler(e) {
    e.preventDefault();
    let trgElem = e.target;
    if (
      !trgElem.town.value ||
      !trgElem.size.value ||
      !trgElem.name.value ||
      !trgElem.email.value ||
      !trgElem.time.value ||
      !trgElem.date.value
    ) {
      callWarningModal("Please, fill all fields!");
      return false;
    }
    if(trgElem.time){
      if(trgElem.time.value >= "18:00" || trgElem.time.value < "09:00"){
        callWarningModal("Time should not be more than 18:00 and less than 09:00");
        return false;
      }
    }
    if (trgElem.name.value.length <= 3) {
      callWarningModal("Name field must be at least 3 characters!");
      return false;
    }

    if (!isClientDateLargeThenCurrDate(trgElem.date.value)) {
      callWarningModal(
        "Date must not be less than or equal to the current date"
      );
      return false;
    }

    let endOrderTime;
    let clientTimeHour = +state.currentOrder.time.match(/\d\d/);
    let clientTimeMin = state.currentOrder.time.match(/:\d\d$/);
    switch (state.currentOrder.size) {
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
    dispatch(changeClientOrderFormIsLoad(true));
    getFreeMastersByClientTownFromServer(
      SERVERDOMAIN,
      trgElem.town.value,
      state.currentOrder.time,
      endOrderTime,
      state.currentOrder.date
    ).then((data) => {
      dispatch(changeClientOrderFormIsLoad(false));
      if (data.success) {
        dispatch(addSuitableMasters(data.payload));
        history.push("/client/masters");
      } else {
        dispatch(addSuitableMasters([]));
        callWarningModal(data.msg);
        history.push("/client");
      }
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
    return fetch(`${url}/masters`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
          ? "Bearer " + localStorage.getItem("token")
          : "",
        "Content-Type": "application/json;charset=utf-8",
        include: "free",
      },
      body: JSON.stringify(obj),
    }).then((json) => json.json());
  }

  function isClientDateLargeThenCurrDate(clientDate) {
    const clientDt = new Date(clientDate);
    const currDate = new Date();

    if (currDate.getTime() > clientDt.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  function callWarningModal(msg) {
    dispatch(
      changeWarningModalData({
        msg: msg,
      })
    );
    document.getElementById("callWarningModalBtn").click();
  }

  return (
    <>
      <div className="text-center mb-1">
        You are welcomed by <h1 className="font-italic">Clockwise company</h1>
      </div>
      <br />
      <div className="text-center">Fill out this form to order a master</div>
      <OrderForm
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        currentOrder={state.currentOrder}
        isLoadOrderForm={state.orderFormIsLoad}
        townsArr={state.townsArr}
        townsInOrderFormIsLoad={state.townsInOrderFormIsLoad}
      />
    </>
  );
}

OrderFormClient.propTypes = {
  history: PropTypes.object,
};

export default OrderFormClient;
