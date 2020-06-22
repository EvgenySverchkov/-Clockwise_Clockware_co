import React from 'react';
import {NavLink} from "react-router-dom";
import "./firstScreen.css"

export default ()=>{
  return (
    <div className="screenRefWrapper">
      <NavLink to="/client">
        <div className="screenRef" id="clientRef">I am client</div>
      </NavLink>
      <NavLink to= "/admin">
        <div className="screenRef" id="adminRef">I am admin</div>
      </NavLink>
    </div>
  );
}
