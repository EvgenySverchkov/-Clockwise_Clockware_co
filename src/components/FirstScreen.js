import React from 'react';
import {NavLink} from "react-router-dom";

export default ()=>{
  return (
    <div style={style} className="btnWrapper">
      <NavLink to="/client">
        <div className="toClientScreenBtn">I am client</div>
      </NavLink>
      <NavLink to= "/admin">
        <div className="toAdminScreenBtn">I am admin</div>
      </NavLink>
    </div>
  );
}

const style = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  height: "100vh"
}
