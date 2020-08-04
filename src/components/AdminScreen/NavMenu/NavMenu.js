import React from "react";
import { Link } from "react-router-dom";
import NavBtn from "./NavBtn";
import LogOutBtn from "./LogOutBtn";
import "./navmenu.scss";

function NavMenu() {
  return (
    <div className="nav-menu-wrapp mb-3 mb-sm-5">
      <div className="btn-group nav-menu">
        <NavBtn title={"Orders"}>
          <Link to="/admin/ordersList" className="dropdown-item">
            Show orders
          </Link>
          <Link to="/admin/addOrderForm" className="dropdown-item">
            Add order
          </Link>
        </NavBtn>
        <NavBtn title={"Masters"}>
          <Link to="/admin/mastersList" className="dropdown-item">
            Show masters
          </Link>
          <Link to="/admin/addMasterForm" className="dropdown-item">
            Add master
          </Link>
        </NavBtn>
        <NavBtn title={"Towns"}>
          <Link to="/admin/townsList" className="dropdown-item">
            Show towns
          </Link>
          <Link to="/admin/addTownForms" className="dropdown-item">
            Add town
          </Link>
        </NavBtn>
        <LogOutBtn />
      </div>
    </div>
  );
}

export default NavMenu;
