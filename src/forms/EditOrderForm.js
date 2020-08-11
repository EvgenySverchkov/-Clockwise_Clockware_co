import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {updateOrderInState} from "../store/adminPanel/orders/actions";
import putDataToServer from "../components/AdminScreen/services/putDataToServer";

import EditForm from "./EditForm";

import { SERVERDOMAIN } from "../services/serverUrls";

const EditOrderForm = ({match,history}) => {
  const state = useSelector(state=>{
    return {ordersArr: state.orders_reducer.ordersArr}
  });
  const dispatch = useDispatch();

  function editOrderHandler(e, newOrderObj) {
    e.preventDefault();
    putDataToServer(`${SERVERDOMAIN}/orders/put/${newOrderObj.id}`, newOrderObj)
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          dispatch(updateOrderInState(data));
          history.push("/admin/ordersList");
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <EditForm
      id={+match.params.id}
      handler={editOrderHandler}
      arrFromState={state.ordersArr.map(item=>{return {...item, town: "", size: "", masterId: null}})}
    />
  );
};

EditOrderForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};


export default EditOrderForm;
