import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const NavItem = ({title, link}) => (
    <li className="nav-item">
        <Link className="nav-link" to={link}>
            {title}
        </Link>
    </li>
);

NavItem.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string
}

export default NavItem;