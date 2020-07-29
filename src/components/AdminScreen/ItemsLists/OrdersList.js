import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {initOrders, deleteOrderFromState} from "../../../store/adminPanel/actions";
import deleteDataFromServer from "../services/deleteDataFromServer";

import List from "../List";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const OrdersList = ({ordersArr, initOrders, deleteOrderFromState, history}) => {
    function getOrdersFromServerToState() {
        const headers = {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          "Content-Type": "application/json",
        };
        fetch(`${SERVERDOMAIN}/orders`, { headers })
        .then((json) => json.json())
        .then((data) => initOrders(data));
    }
    function deleteOrderById(orderId) {
        deleteDataFromServer(`${SERVERDOMAIN}/orders/delete/${orderId}`)
        .then((data) => {
            if (data.success) {
              deleteOrderFromState(data.payload);
              alert(data.msg);
            } else {
                alert(data.msg);
            }
        })
        .catch((err) => alert(err));
    }
    return <List
        dataArr={ordersArr}
        deleteAction={deleteOrderById}
        mainRows={["name", "time", "date", "town"]}
        getData={getOrdersFromServerToState}
        history = {history}
  />   
}

OrdersList.propTypes = {
    ordersArr: PropTypes.array.isRequired, 
    initOrders: PropTypes.func.isRequired,
    deleteOrderFromState: PropTypes.func.isRequired,
    history: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        ordersArr: state.orders_reducer.ordersArr,
    }
}

const actions = {
    initOrders,
    deleteOrderFromState
}

export default connect(mapStateToProps, actions)(OrdersList);