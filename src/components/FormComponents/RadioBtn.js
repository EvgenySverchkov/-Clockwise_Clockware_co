import React from "react";
import PropTypes from "prop-types";

const RadioBtn = ({ id, value, name, chngHandler, children }) => (
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      onChange={chngHandler || null}
      name={name}
      id={id}
      value={value}
    />
    {children}
  </div>
);

RadioBtn.propTypes = {
  id: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  chngHandler: PropTypes.func,
  children: PropTypes.node,
};

export default RadioBtn;
