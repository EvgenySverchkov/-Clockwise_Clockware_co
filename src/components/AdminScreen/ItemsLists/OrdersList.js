import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  initOrders,
  deleteOrderFromState,
} from "../../../store/adminPanel/orders/actions";

import {changeListIsLoad} from "../../../store/adminPanel/services/actions";
import deleteDataFromServer from "../services/deleteDataFromServer";

import List from "../List";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const OrdersList = ({history}) => {
  const state = useSelector(state=>{
    return {
      ordersArr: state.orders_reducer.ordersArr,
      listIsLoad: state.main_adminPanel_reduser.listIsLoad
    }
  });
  const dispatch = useDispatch();

  function getOrdersFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    dispatch(changeListIsLoad(true));
    fetch(`${SERVERDOMAIN}/orders`, { headers })
      .then((json) => json.json())
      .then((data) => {
        dispatch(initOrders(data))
        dispatch(changeListIsLoad(false))
      })
      .catch(err=>{
        alert(err)
        dispatch(changeListIsLoad(false))
      });
  }
  function deleteOrderById(orderId) {
    deleteDataFromServer(`${SERVERDOMAIN}/orders/delete/${orderId}`)
      .then((data) => {
        if (data.success) {
          dispatch(deleteOrderFromState(data.payload));
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <List
      dataArr={state.ordersArr}
      deleteAction={deleteOrderById}
      mainRows={["name", "time", "date", "town"]}
      getData={getOrdersFromServerToState}
      history={history}
      listIsLoad = {state.listIsLoad}
    />
  );
};

OrdersList.propTypes = {
  history: PropTypes.object,
};

export default OrdersList;
