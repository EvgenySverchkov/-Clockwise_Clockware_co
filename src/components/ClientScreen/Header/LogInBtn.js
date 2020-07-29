import React from "react";
import { Link } from "react-router-dom";

function LogIn() {
  return (
    <li className="nav-item">
      <Link className="nav-link" to="/client/login">
        Login
      </Link>
    </li>
  );
}

export default LogIn;
