import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { townsInit } from "../store/adminPanel/towns/actions";
import { addSuitableMasters } from "../store/adminPanel/masters/actions";
import { addCurrentOrderToState } from "../store/adminPanel/orders/actions";
import {
  changeOrderFormIsLoad,
  changeModalWarningDataAdmin,
} from "../store/adminPanel/services/actions";

import { SERVERDOMAIN } from "../services/serverUrls";

import OrderForm from "./OrderForm";

function OrderFormAdmin({ history }) {
  const state = useSelector((state) => {
    return {
      currentOrder: state.orders_reducer.currentOrder,
      townsArr: state.town_reduser.towns,
      orderFormIsLoad: state.main_adminPanel_reduser.orderFormIsLoad,
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
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => dispatch(townsInit(data)));
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
      dispatch(
        changeModalWarningDataAdmin({ msg: "Please, filling all gaps!!!" })
      );
      document.getElementById("callWarningModalBtn").click();
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
    dispatch(changeOrderFormIsLoad(true));
    getFreeMastersByClientTownFromServer(
      SERVERDOMAIN,
      trgElem.town.value,
      state.currentOrder.time,
      endOrderTime,
      state.currentOrder.date
    ).then((data) => {
      dispatch(changeOrderFormIsLoad(false));
      if (data.success) {
        dispatch(addSuitableMasters(data.payload));
        history.push("/admin/freeMasters");
      } else {
        dispatch(addSuitableMasters([]));
        dispatch(changeModalWarningDataAdmin({ msg: data.msg }));
        document.getElementById("callWarningModalBtn").click();
        history.push("/admin/addOrderForm");
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
        Authorization: sessionStorage.getItem("token")
          ? "Bearer " + sessionStorage.getItem("token")
          : "",
        "Content-Type": "application/json;charset=utf-8",
        include: "free",
      },
      body: JSON.stringify(obj),
    }).then((json) => json.json());
  }
  return (
    <OrderForm
      currentOrder={state.currentOrder || []}
      changeHandler={changeHandler}
      townsArr={state.townsArr}
      submitHandler={submitHandler}
      isLoadOrderForm={state.orderFormIsLoad}
    />
  );
}

OrderForm.propTypes = {
  submitHandler: PropTypes.func,
};

export default OrderFormAdmin;
