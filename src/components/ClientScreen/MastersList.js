import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  changeMasterListIsLoad,
  addOrdersToState,
  addCurrentOrderToState,
} from "../../store/clientSide/actions";
import FreeMastersList from "../FreeMasterList";

import { SERVERDOMAIN } from "../../services/serverUrls";
function MastersList(props) {
  function submitHandler(e) {
    e.preventDefault();
    let masterId = e.target.chooseMaster.value;
    if (!masterId) {
      alert("Please, choose one!!!");
      return false;
    }
    let endOrderTime;
    let clientTimeHour = +props.currentOrder.time.match(/[^:]+/);
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
    let newObj = {
      ...props.currentOrder,
      masterId: masterId,
      endTime: endOrderTime,
    };

    props.changeMasterListIsLoad(true);
    fetch(`${SERVERDOMAIN}/orders/post`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")? "Bearer " + localStorage.getItem("token") : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((json) => json.json())
      .then((data) => {
        props.changeMasterListIsLoad(false);
        if (data.success) {
          alert(data.msg);
          props.history.push("/");
          sendConfirmEmail(`${SERVERDOMAIN}/send_message`, data.payload.email);
          props.addCurrentOrderToState(
            props.isAuth
              ? {
                  email: JSON.parse(localStorage.getItem("user")).email,
                }
              : {}
          );
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        props.changeMasterListIsLoad(false);
        alert(err);
      });
  }
  function sendConfirmEmail(data) {
    fetch(`${SERVERDOMAIN}/send_message`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }
  return (
    <FreeMastersList 
      submitHandler = {submitHandler}
      suitableMasters = {props.suitableMasters} 
      isLoad={props.masterListIsLoad}
      backTo={"/client"}/>
  );
}

function mapStateToProps(state) {
  return {
    suitableMasters: state.client_order_reduser.suitableMasters,
    currentOrder: state.client_order_reduser.currentOrder,
    masterListIsLoad: state.client_order_reduser.masterListIsLoad,
    ordersArr: state.client_order_reduser.ordersArr,
  };
}
const actions = {
  changeMasterListIsLoad,
  addOrdersToState,
  addCurrentOrderToState,
};
MastersList.propTypes = {
  mastersArr: PropTypes.array,
  currentOrder: PropTypes.object,
  submitHandler: PropTypes.func,
};

export default connect(mapStateToProps, actions)(MastersList);
