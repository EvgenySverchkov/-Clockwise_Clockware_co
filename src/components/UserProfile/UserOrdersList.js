import React from "react";
import {useDispatch, useSelector} from "react-redux"

import List from "../AdminScreen/List";
import {initUserOrders, changeUserOrdersListIsLoad} from "../../store/orders/actions";
import { SERVERDOMAIN } from "../../services/serverUrls";

const UserOrdersList = ({history}) => {
    const dispatch = useDispatch();
    const state = useSelector(state=>{
        return {
            userOrders: state.clientOrderReduser.userOrders,
            userOrdersListIsLoad: state.clientOrderReduser.userOrdersListIsLoad
        }
    });
    function getUserOrdersFromServerToState(){
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token") || "",
            "Content-Type": "application/json"
          };
          dispatch(changeUserOrdersListIsLoad(true));
        fetch(`${SERVERDOMAIN}/orders/getUserOrders`, { headers, method: "POST", body: localStorage.getItem("user") })
            .then((json) => json.json())
            .then((data) => {
              dispatch(initUserOrders(data));
              dispatch(changeUserOrdersListIsLoad(false));
            })
            .catch((err) => {
              alert(err);
              dispatch(changeUserOrdersListIsLoad(false));
            });
    }
    return <List 
        dataArr={state.userOrders}
        mainRows={["name", "time", "date", "town"]}
        getData={getUserOrdersFromServerToState}
        history={history}
        listIsLoad={state.userOrdersListIsLoad}
    />
}

export default UserOrdersList;