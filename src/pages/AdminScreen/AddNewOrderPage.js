import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { townsInit } from "../../store/townsManagement/actions";
import { addSuitableMasters } from "../../store/masterManagement/actions";
import {
  addCurrentOrderToState,
  changeAdminOrderFormIsLoad,
} from "../../store/ordersManagement/actions";
import { changeModalWarningDataAdmin } from "../../store/adminModalWindows/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import OrderForm from "../../forms/OrderForm";

function AddNewOrderPage({ history }) {
  const state = useSelector((state) => {
    return {
      currentOrder: state.ordersReducer.currentOrder,
      townsArr: state.townReduser.towns,
      orderFormIsLoad: state.ordersReducer.adminOrderFormIsLoad,
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
        changeModalWarningDataAdmin({ msg: "Please, fill all fields!!!" })
      );
      document.getElementById("callWarningModalBtn").click();
      return false;
    }

    if (trgElem.time) {
      if (trgElem.time.value >= "18:00" || trgElem.time.value < "09:00") {
        dispatch(
          changeModalWarningDataAdmin({
            msg: "Time should not be more than 18:00 and less than 09:00",
          })
        );
        document.getElementById("callWarningModalBtn").click();
        return false;
      }
    }
    if (trgElem.name.value.length <= 3) {
      dispatch(
        changeModalWarningDataAdmin({
          msg: "Name field must be at least 3 characters!",
        })
      );
      document.getElementById("callWarningModalBtn").click();
      return false;
    }
    console.log(isClientDateLargeThenCurrDate(trgElem.date.value))
    if (!isClientDateLargeThenCurrDate(trgElem.date.value)) {
      console.log(":")
      dispatch(
        changeModalWarningDataAdmin({
          msg: "Date must not be less than or equal to the current date",
        })
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
    dispatch(changeAdminOrderFormIsLoad(true));
    getFreeMastersByClientTownFromServer(
      SERVERDOMAIN,
      trgElem.town.value,
      state.currentOrder.time,
      endOrderTime,
      state.currentOrder.date
    ).then((data) => {
      dispatch(changeAdminOrderFormIsLoad(false));
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
  function isClientDateLargeThenCurrDate(clientDate) {
    const clientDt = new Date(clientDate);
    const currDate = new Date();

    if (currDate.getTime() > clientDt.getTime()) {
      return false;
    } else {
      return true;
    }
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

AddNewOrderPage.propTypes = {
  submitHandler: PropTypes.func,
};

export default AddNewOrderPage;
