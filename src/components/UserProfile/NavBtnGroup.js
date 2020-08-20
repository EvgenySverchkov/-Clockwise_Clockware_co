import React from "react";
import {Link} from "react-router-dom";
import LogOutBtn from "./LogOutBtn";

const NavBtnGroup = () => (
<div className="btn-group col-12 p-0 mb-2" role="group">
    <Link type="button" className="btn btn-secondary" to="/client/userProfile/userOrders">Orders</Link>
    <Link type="button" className="btn btn-secondary" to="/client/userProfile/userSettings">Settings</Link>
    <LogOutBtn />
</div>
);

export default NavBtnGroup;