import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  addCurrentOrderToState,
  addSuitableMasters,
} from "../../store/clientSide/data/actions";
import { addTownsToState } from "../../store/clientSide/towns/actions";
import {
  changeOrderFormIsLoad,
  changeTownsFromOrderFormIsLoad,
  changeWarningModalData,
} from "../../store/clientSide/services/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import OrderForm from "../../forms/OrderForm";

function OrderFormClient({ history }) {
  const state = useSelector((state) => {
    return {
      currentOrder: state.client_order_reduser.currentOrder,
      orderFormIsLoad: state.client_services.orderFormIsLoad,
      townsArr: state.client_towns_reduser.townsArr,
      townsInOrderFormIsLoad: state.client_services.townsInOrderFormIsLoad,
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
    const datetime_regex = /(\d\d\d\d)-(\d\d)-(\d\d)/;
    const client_date_arr = datetime_regex.exec(clientDate);
    const client_datetime = new Date(
      `${client_date_arr[3]}-${client_date_arr[2]}-${client_date_arr[1]}`
    );

    const currDate = new Date();

    if (currDate.getTime() > client_datetime.getTime()) {
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
