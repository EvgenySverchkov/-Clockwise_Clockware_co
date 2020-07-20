import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  addCurrentOrderToState,
  changeOrderFormIsLoad,
  addSuitableMasters,
  addTownsToState
} from "../../store/clientSide/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import OrderForm from "../OrderForm";

function OrderFormClient(props) {
  useEffect(function(){
    getTownsFromServerToState();
  }, []);
  function changeHandler(e) {
    let idx = e.target.name;
    props.addCurrentOrderToState({
      ...props.currentOrder,
      [idx]: e.target.value,
    });
  }
  function getTownsFromServerToState() {
    const headers = {
      Authorization: localStorage.getItem("token")? "Bearer " + localStorage.getItem("token") : "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => props.addTownsToState(data));
  }
  function submitHandler(e) {
    e.preventDefault();
    let trgElem = e.target;
    if (!trgElem.town.value || !trgElem.size.value || !trgElem.name.value || !trgElem.email.value || !trgElem.time.value || !trgElem.date.value) {
      alert("Please, filling all gaps!!!");
      return false;
    }

    let endOrderTime;
    let clientTimeHour = +props.currentOrder.time.match(/\d\d/);
    let clientTimeMin = props.currentOrder.time.match(/:\d\d$/);
    switch (props.currentOrder.size) {
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
    props.changeOrderFormIsLoad(true);
    getFreeMastersByClientTownFromServer(
      SERVERDOMAIN,
      trgElem.town.value,
      props.currentOrder.time,
      endOrderTime,
      props.currentOrder.date
    ).then((data) => {
      props.changeOrderFormIsLoad(false);
      props.addSuitableMasters(data);
      props.history.push("/client/masters");
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
        Authorization: localStorage.getItem("token")? "Bearer " + localStorage.getItem("token") : "",
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
        orderFormIsLoad={props.orderFormIsLoad}
        currentOrder={props.currentOrder}
        orderFormIsLoad={props.orderFormIsLoad}
        townsArr={props.townsArr}
      />
    </>
  );
}
function mapStateToProps(state) {
  return {
    currentOrder: state.client_order_reduser.currentOrder,
    orderFormIsLoad: state.client_order_reduser.orderFormIsLoad,
    townsArr: state.client_order_reduser.townsArr,
  };
}

const actions = {
  addCurrentOrderToState,
  changeOrderFormIsLoad,
  addSuitableMasters,
  addTownsToState
};

OrderForm.propTypes = {
  currentOrder: PropTypes.object,
  submitHandler: PropTypes.func,
  townsArr: PropTypes.array,
  addCurrentOrderToState: PropTypes.func,
};

export default connect(mapStateToProps, actions)(OrderFormClient);
