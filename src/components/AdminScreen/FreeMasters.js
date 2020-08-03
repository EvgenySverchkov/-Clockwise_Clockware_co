import React from "react";
import { connect } from "react-redux";

import FreeMastersForm from "../../forms/FreeMastersForm";
import {
  addCurrentOrderToState,
  changeMasterListIsLoad,
} from "../../store/adminPanel/actions";
import { SERVERDOMAIN } from "../../services/serverUrls";
import sendConfirmEmail from "../../services/mailSendler";

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
        Authorization: sessionStorage.getItem("token")
          ? "Bearer " + sessionStorage.getItem("token")
          : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((json) => json.json())
      .then((data) => {
        props.changeMasterListIsLoad(false);
        if (data.success) {
          alert(data.msg);
          props.history.push("/admin/ordersList");
          props.addCurrentOrderToState({});
          sendConfirmEmail(`${SERVERDOMAIN}/send_message`, data.payload.email);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        props.changeMasterListIsLoad(false);
        alert(err);
      });
  }
  return (
    <FreeMastersForm
      submitHandler={submitHandler}
      isLoad={props.masterListIsLoad}
      suitableMasters={props.suitableMasters}
      backTo={"/admin/addOrderForm"}
    />
  );
}

function mapStateToProps(state) {
  return {
    suitableMasters: state.orders_reducer.suitableMasters,
    masterListIsLoad: state.master_reducer.masterListIsLoad,
  };
}
export default connect(mapStateToProps, {
  addCurrentOrderToState,
  changeMasterListIsLoad,
})(MastersList);
