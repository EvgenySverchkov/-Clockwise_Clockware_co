import React from "react";
import PropTypes from "prop-types";

const EmptyList = ({children}) => (
    <div className="text-left display-4">
        {children}
    </div>
);

EmptyList.propTypes = {
    children: PropTypes.node.isRequired
}

export default EmptyList;