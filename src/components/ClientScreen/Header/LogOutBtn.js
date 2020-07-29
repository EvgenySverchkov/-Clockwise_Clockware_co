import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {toggleAuth, addCurrentOrderToState} from "../../../store/clientSide/actions";

function LogOutBtn({toggleAuth, addCurrentOrderToState, currentOrder}) {
  function logOutHandl() {
    ["user", "token"].forEach((item) => localStorage.removeItem(item));
    addCurrentOrderToState({ ...currentOrder, email: "" });
    toggleAuth(false);
  }
  return (
    <li className="nav-item">
      <Link className="nav-link" to="/" onClick={logOutHandl}>
        Logout
      </Link>
    </li>
  );
}

LogOutBtn.propTypes = {
  toggleAuth: PropTypes.func.isRequired, 
  addCurrentOrderToState: PropTypes.func.isRequired, 
  currentOrder: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    currentOrder: state.orders_reducer.currentOrder
  }
};

export default connect(mapStateToProps, {toggleAuth, addCurrentOrderToState})(LogOutBtn);
