import React from "react";
import { Link } from "react-router-dom";

function LogOutBtn({ handler }) {
  return (
    <li className="nav-item">
      <Link className="nav-link" to="/client" onClick={handler}>
        Logout
      </Link>
    </li>
  );
}

export default LogOutBtn;
