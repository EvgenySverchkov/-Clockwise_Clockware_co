import React from "react";
import PropTypes from "prop-types";

const Label = ({ children, forId, isFontWeight=true }) => (
  <label
    htmlFor={forId}
    className={`pl-0 pr-0 col-sm-4 col-md-4 col-form-label ${isFontWeight ? "font-weight-bold": ''}`}
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node.isRequired, 
  forId: PropTypes.string.isRequired, 
  isFontWeight: PropTypes.bool
}

export default Label;
