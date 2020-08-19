import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toogleAuthAdmin } from "../../../store/auth/actions";

const LogOutBtn = () => {
  const dispatch = useDispatch();

  function handler() {
    sessionStorage.removeItem("token");
    dispatch(toogleAuthAdmin(false));
  }
  return (
    <div className="mr-1">
      <Link
        to="/admin"
        onClick={handler}
        className="btn btn-secondary"
        aria-haspopup="true"
        aria-expanded="false"
      >
        LogOut
      </Link>
    </div>
  );
};

export default LogOutBtn;
