import React from "react";
import { useSelector } from "react-redux";

import LogOutBtn from "./LogOutBtn";
import LogInBtn from "./LogInBtn";
import NavItem from "./NavItem";

const NavList = () => {
  const state = useSelector((state) => {
    return { isAuth: state.client_services.isAuth };
  });
  return (
    <>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample03"
        aria-controls="navbarsExample03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbarsExample03">
        <ul className="navbar-nav mr-auto">
          {state.isAuth ? <LogOutBtn /> : <LogInBtn />}
          <NavItem title={"SignUp"} link={"/client/registration"} />
          <NavItem title={"To main"} link={"/client"} />
        </ul>
      </div>
    </>
  );
};

export default NavList;
