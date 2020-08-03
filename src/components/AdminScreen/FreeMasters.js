import React from "react";
import { useDispatch, useSelector } from "react-redux";

import FreeMastersForm from "../../forms/FreeMastersForm";
import {
  addCurrentOrderToState,
  changeMasterListIsLoad,
} from "../../store/adminPanel/actions";
import { SERVERDOMAIN } from "../../services/serverUrls";
import sendConfirmEmail from "../../services/mailSendler";

function MastersList(props) {
  const state = useSelector(state=>{
    return {
      suitableMasters: state.orders_reducer.suitableMasters,
      masterListIsLoad: state.master_reducer.masterListIsLoad
    }
  });
  const dispatch = useDispatch();

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

    dispatch(changeMasterListIsLoad(true));
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
        dispatch(changeMasterListIsLoad(false));
        if (data.success) {
          alert(data.msg);
          props.history.push("/admin/ordersList");
          dispatch(addCurrentOrderToState({}));
          sendConfirmEmail(`${SERVERDOMAIN}/send_message`, data.payload.email);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        dispatch(changeMasterListIsLoad(false));
        alert(err);
      });
  }
  return (
    <FreeMastersForm
      submitHandler={submitHandler}
      isLoad={state.masterListIsLoad}
      suitableMasters={state.suitableMasters}
      backTo={"/admin/addOrderForm"}
    />
  );
}

export default MastersList;
