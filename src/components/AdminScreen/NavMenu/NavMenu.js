import React from "react";
import { Link } from "react-router-dom";
import "./navmenu.css";

function NavMenu() {
  return (
    <div className="nav-menu-wrapp mb-3 mb-sm-5">
      <div className="btn-group nav-menu">
        <div className="dropdown mr-1">
          <button
            className="btn btn-secondary dropdown-toggle"
            href="#"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Orders
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <Link to="/admin/ordersList" className="dropdown-item">
              Show orders
            </Link>
          </div>
        </div>
        <div className="dropdown mr-1">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Masters
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <Link to="/admin/mastersList" className="dropdown-item">
              Show masters
            </Link>
            <Link to="/admin/addMasterForm" className="dropdown-item">
              Add master
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Towns
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuLink"
          >
            <Link to="/admin/townsList" className="dropdown-item">
              Show towns
            </Link>
            <Link to="/admin/addTownForms" className="dropdown-item">
              Add town
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavMenu;
