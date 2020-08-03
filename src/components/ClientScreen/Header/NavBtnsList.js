import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LogOutBtn from "./LogOutBtn";
import LogInBtn from "./LogInBtn";
import NavItem from "./NavItem";

const NavList = ({ isAuth }) => (
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
        {isAuth ? <LogOutBtn /> : <LogInBtn />}
        <NavItem title={"SignUp"} link={"/client/registration"} />
        <NavItem title={"To main"} link={"/client"} />
      </ul>
    </div>
  </>
);

NavList.propTypes = {
  isAuth: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAuth: state.client_order_reduser.isAuth,
  };
}

export default connect(mapStateToProps)(NavList);
