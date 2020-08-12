import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateOrderInState } from "../store/adminPanel/orders/actions";
import putDataToServer from "../components/AdminScreen/services/putDataToServer";
import {
  changeSuccessModalDataAdmin,
  changeModalWarningDataAdmin,
} from "../store/adminPanel/services/actions";

import EditForm from "./EditForm";

import { SERVERDOMAIN } from "../services/serverUrls";

const EditOrderForm = ({ match, history }) => {
  const state = useSelector((state) => {
    return { ordersArr: state.orders_reducer.ordersArr };
  });
  const dispatch = useDispatch();

  function editOrderHandler(e, newOrderObj) {
    e.preventDefault();
    putDataToServer(`${SERVERDOMAIN}/orders/put/${newOrderObj.id}`, newOrderObj)
      .then((data) => {
        if (data.success) {
          dispatch(
            changeSuccessModalDataAdmin({
              msg: data.msg,
              backBtnTxt: "Go to the list of masters",
              backTo: "/admin/ordersList",
            })
          );
          document.getElementById("callSuccessModalBtn").click();
          history.push("/admin");
          dispatch(updateOrderInState(data));
        } else {
          dispatch(changeModalWarningDataAdmin({ msg: data.msg }));
          document.getElementById("callWarningModalBtn").click();
        }
      })
      .catch((err) => alert(err));
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
