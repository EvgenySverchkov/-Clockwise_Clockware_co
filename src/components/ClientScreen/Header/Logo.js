import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Logo = ({children}) => (
    <Link to="/client" className="navbar-brand">
          {children}
    </Link>
);

Logo.propTypes = {
    children: PropTypes.node.isRequired
}

export default Logo;