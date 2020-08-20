import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function LinkToEditForm({ id }) {
  let location = useLocation();

  function chooseRoute(currentPath) {
    let arr = currentPath.split("/");
    switch (arr[arr.length - 1]) {
      case "clientsList":
        return "/admin/editClient/";
      case "mastersList":
        return "/admin/editMaster/";
      case "townsList":
        return "/admin/editTown/";
      case "ordersList":
        return "/admin/editOrder/";
      default:
        return currentPath;
    }
  }
  return (
    <Link to={chooseRoute(location.pathname) + id} className="dropdown-item">
      Edit
    </Link>
  );
}
LinkToEditForm.propTypes = {
  id: PropTypes.number,
};
export default LinkToEditForm;
