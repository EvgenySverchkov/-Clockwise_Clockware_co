import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateOrderInState } from "../store/ordersManagement/actions";
import putDataToServer from "../components/AdminScreen/services/putDataToServer";

import EditForm from "./EditForm";

import Context from "../ContextComponent";

import { SERVERDOMAIN } from "../services/serverUrls";

const EditOrderForm = ({ match, history }) => {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return { ordersArr: state.ordersReducer.ordersArr };
  });
  const dispatch = useDispatch();

  function editOrderHandler(e, newOrderObj) {
    e.preventDefault();
    const trgElem = e.target;
    if (
      !trgElem.town.value ||
      !trgElem.size.value ||
      !trgElem.name.value ||
      !trgElem.email.value ||
      !trgElem.time.value ||
      !trgElem.date.value
    ) {
      context.openErrorWindowWithMsg("Please, fill all fields!!!");
      return false;
    }
    if (!trgElem.email.value.match(/^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,}$/)) {
      context.openWarningTooltip("Invalid email format!", trgElem.email.id);
      return false;
    }

    if (trgElem.time.value >= "18:00" || trgElem.time.value < "09:00") {
      context.openWarningTooltip("Time should not be more than 18:00 and less than 09:00", trgElem.time.id);
      return false;
    }

    if (trgElem.name.value.length <= 3) {
      context.openWarningTooltip("Name field must be at least 3 characters!", trgElem.name.id);
      return false;
    }
    if (trgElem.name.value.match(/\d/) || !trgElem.name.value.match(/\b\w{3,20}\b/)) {
      context.openWarningTooltip("String name should:\n1. Not contain numbers\n2. Not be shorter than 3 characters\n3. Not longer than 20 characters\n4. Do not contain Cyrillic characters!", trgElem.name.id);
      return false;
    }
    if (!isClientDateLargeThenCurrDate(trgElem.date.value)) {
      context.openWarningTooltip("Date must not be less than or equal to the current date", trgElem.date.id);
      return false;
    }

    function isClientDateLargeThenCurrDate(clientDate) {
      const clientDt = new Date(clientDate);
      const currDate = new Date();
  
      if (currDate.getTime() > clientDt.getTime()) {
        return false;
      } else {
        return true;
      }
    }
    putDataToServer(`${SERVERDOMAIN}/orders/put/${newOrderObj.id}`, newOrderObj)
      .then((data) => {
        if (data.success) {
          context.openSuccessWindowWithMsg(data.msg);
          dispatch(updateOrderInState(data));
        } else {
          context.openErrorWindowWithMsg(data.msg);
        }
      })
      .catch((err) => context.openErrorWindowWithMsg(err));
  }
  return (
    <EditForm
      id={+match.params.id}
      handler={editOrderHandler}
      arrFromState={state.ordersArr.map((item) => {
        return { ...item, town: "", size: "", masterId: null };
      })}
    />
  );
};

EditOrderForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default EditOrderForm;
