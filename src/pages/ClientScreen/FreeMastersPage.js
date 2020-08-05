import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  addCurrentOrderToState,
} from "../../store/clientSide/data/actions";
import {changeMasterListIsLoad} from "../../store/clientSide/services/actions";
import FreeMastersForm from "../../forms/FreeMastersForm";
import sendMail from "../../services/mailSendler";

import { SERVERDOMAIN } from "../../services/serverUrls";
function MastersList({history}) {
  const state = useSelector(state=>{
    return {
      suitableMasters: state.client_order_reduser.suitableMasters,
      currentOrder: state.client_order_reduser.currentOrder,
      masterListIsLoad: state.client_services.masterListIsLoad,
      isAuth: state.client_services.isAuth
    }
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
    let endOrderTime;
    let clientTimeHour = +state.currentOrder.time.match(/[^:]+/);
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
    let newObj = {
      ...state.currentOrder,
      masterId: masterId,
      endTime: endOrderTime,
    };

    dispatch(changeMasterListIsLoad(true));
    fetch(`${SERVERDOMAIN}/orders/post`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
          ? "Bearer " + localStorage.getItem("token")
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
          history.push("/");
          sendMail(`${SERVERDOMAIN}/send_message`, data.payload.email);
          dispatch(addCurrentOrderToState(
            state.isAuth
              ? {
                  email: JSON.parse(localStorage.getItem("user")).email,
                }
              : {}
          ));
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
      suitableMasters={state.suitableMasters}
      isLoad={state.masterListIsLoad}
      backTo={"/client"}
    />
  );
}

MastersList.propTypes = {
  mastersArr: PropTypes.array,
  submitHandler: PropTypes.func,
  history: PropTypes.object,
  isAuth: PropTypes.bool,
};

export default MastersList;
