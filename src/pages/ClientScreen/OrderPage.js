import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { addCurrentOrderToState, changeClientOrderFormIsLoad } from "../../store/ordersManagement/actions";
import { changeTownsFromOrderFormIsLoad, addTownsToState } from "../../store/townsManagement/actions";
import { addSuitableMasters } from "../../store/masterManagement/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import OrderForm from "../../forms/OrderForm";
import Context from "../../ContextComponent";

function OrderFormClient({ history }) {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return {
      currentOrder: state.ordersReducer.currentOrder,
      orderFormIsLoad: state.ordersReducer.orderFormIsLoad,
      townsArr: state.townReduser.townsArr,
      townsInOrderFormIsLoad: state.townReduser.townsInOrderFormIsLoad,
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
      context.openErrorWindowWithMsg("Please, fill all fields!");
      return false;
    }
    if (!trgElem.email.value.match(/^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,}$/)) {
      context.openWarningTooltip("Invalid email format!", trgElem.email.id);
      return false;
    }
    if (trgElem.time.value >= "18:00" || trgElem.time.value < "09:00") {
      context.openWarningTooltip(
        "Time should not be more than 18:00 and less than 09:00",
        trgElem.time.id
      );
      return false;
    }

    if (trgElem.name.value.length <= 3) {
      context.openWarningTooltip(
        "Name field must be at least 3 characters!",
        trgElem.name.id
      );
      return false;
    }
    if (
      trgElem.name.value.match(/\d/) ||
      !trgElem.name.value.match(/\b\w{3,20}\b/)
    ) {
      context.openWarningTooltip(
        "String name should:\n1. Not contain numbers\n2. Not be shorter than 3 characters\n3. Not longer than 20 characters\n4. Do not contain Cyrillic characters!",
        trgElem.name.id
      );
      return false;
    }

    if (!isClientDateLargeThenCurrDate(trgElem.date.value)) {
      context.openWarningTooltip(
        "Date must not be less than current date",
        trgElem.date.id
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
        context.openErrorWindowWithMsg(data.msg);
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
    currDate.setDate(currDate.getDate()-1);

    if (currDate.getTime() > clientDt.getTime()) {
      return false;
    } else {
      return true;
    }
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
