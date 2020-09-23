import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import FreeMastersForm from "../../forms/FreeMastersForm";

import { addCurrentOrderToState } from "../../store/ordersManagement/actions";

import { changeMasterListIsLoad } from "../../store/masterManagement/actions";

import Context from "../../ContextComponent";

import { SERVERDOMAIN } from "../../services/serverUrls";
import sendConfirmEmail from "../../services/mailSendler";

function MastersList(props) {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return {
      suitableMasters: state.masterReducer.suitableMasters,
      masterListIsLoad: state.masterReducer.masterListIsLoad,
    };
  });
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    let masterId = e.target.chooseMaster.value;
    if (!e.target.chooseMaster.length) {
      if (!e.target.chooseMaster.checked) {
        masterId = null;
      }
    }
    if (!masterId) {
      context.openErrorWindowWithMsg("Please, choose one!!!");
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
          context.openSuccessWindowWithMsg(data.msg);
          props.history.push("/admin/addOrderForm");
          dispatch(addCurrentOrderToState({}));
          sendConfirmEmail(`${SERVERDOMAIN}/send_message`, data.payload);
        } else {
          context.setWarningModalData(data.msg);
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
