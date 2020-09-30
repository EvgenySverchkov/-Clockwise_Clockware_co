import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addCurrentOrderToState } from "../../store/ordersManagement/actions";
import { toogleAuthClient } from "../../store/auth/actions";

function LogOutBtn() {
  const state = useSelector((state) => {
    return { currentOrder: state.ordersReducer.currentOrder };
  });
  const dispatch = useDispatch();

  function logOutHandl() {
    ["user", "token"].forEach((item) => localStorage.removeItem(item));
    dispatch(addCurrentOrderToState({ ...state.currentOrder, email: "" }));
    dispatch(toogleAuthClient(false));
  }
  return (
    <Link className="btn btn-danger" to="/" onClick={logOutHandl}>
      Logout
    </Link>
  );
}

export default LogOutBtn;
