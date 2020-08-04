import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  addCurrentOrderToState,
  addSuitableMasters,
  addTownsToState
} from "../../store/clientSide/data/actions";
import {changeOrderFormIsLoad} from "../../store/clientSide/services/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import OrderForm from "../../forms/OrderForm";

function OrderFormClient({history}) {
  const state = useSelector(state=>{
    return {
      currentOrder: state.client_order_reduser.currentOrder,
      orderFormIsLoad: state.client_services.orderFormIsLoad,
      townsArr: state.client_order_reduser.townsArr,
    }
  });
  const dispatch = useDispatch();

  useEffect(function () {
    getTownsFromServerToState();
  }, []);
  function changeHandler(e) {
    let idx = e.target.name;
    dispatch(addCurrentOrderToState({
      ...state.currentOrder,
      [idx]: e.target.value,
    }));
  }
  function getTownsFromServerToState() {
    const headers = {
      Authorization: localStorage.getItem("token")
        ? "Bearer " + localStorage.getItem("token")
        : "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => dispatch(addTownsToState(data)));
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
      alert("Please, filling all gaps!!!");
      return false;
    }

    if(trgElem.name.value.length <= 3){
      alert("Name field must be at least 3 characters");
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
        alert(data.msg);
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
    return fetch(`${url}/freeMasters`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
          ? "Bearer " + localStorage.getItem("token")
          : "",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    }).then((json) => json.json());
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
      />
    </>
  );
}

OrderFormClient.propTypes = {
  history: PropTypes.object,
};

export default OrderFormClient;
