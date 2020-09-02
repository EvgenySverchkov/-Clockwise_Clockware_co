import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addCurrentOrderToState } from "../../store/orders/actions";
import { changeClientOrderFormIsLoad } from "../../store/orders/actions";

import FreeMastersForm from "../../forms/FreeMastersForm";
import sendMail from "../../services/mailSendler";

import Context from "../../ContextComponent";

import { SERVERDOMAIN } from "../../services/serverUrls";
function MastersList({ history }) {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return {
      suitableMasters: state.clientMastresReduser.suitableMasters,
      currentOrder: state.clientOrderReduser.currentOrder,
      orderFormIsLoad: state.clientOrderReduser.orderFormIsLoad,
      isAuth: state.authReducer.isAuth,
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
    if (Object.keys(state.currentOrder).length === 1) {
      return false;
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

    dispatch(changeClientOrderFormIsLoad(true));
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
        dispatch(changeClientOrderFormIsLoad(false));
        if (data.success) {
          sendMail(`${SERVERDOMAIN}/send_message`, data.payload);
          dispatch(
            addCurrentOrderToState(
              state.isAuth
                ? {
                    email: JSON.parse(localStorage.getItem("user")).email,
                  }
                : {}
            )
          );
          context.openSuccessWindowWithMsg(data.msg);
          history.push("/");
        } else {
          context.openErrorWindowWithMsg(data.msg);
        }
      })
      .catch((err) => {
        dispatch(changeClientOrderFormIsLoad(false));
        alert(err);
      });
  }
  return (
    <FreeMastersForm
      submitHandler={submitHandler}
      suitableMasters={state.suitableMasters}
      isLoad={state.orderFormIsLoad}
      backTo={"/client"}
      isMakeOrder={Object.keys(state.currentOrder).length <= 1 ? true : false}
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
