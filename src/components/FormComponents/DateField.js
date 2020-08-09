import React from "react";
import PropTypes from "prop-types";

const DateField = ({ min, chngHandler, value, name, max }) => (
  <input
    type="date"
    name={name}
    min={min}
    max={max}
    className="mr-1"
    onChange={chngHandler}
    value={value}
    required
  />
);

DateField.propTypes = {
  min: PropTypes.string.isRequired,
  chngHandler: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
};

export default DateField;
