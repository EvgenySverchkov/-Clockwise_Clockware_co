import React from "react";
import PropTypes from "prop-types";

const TimeField = ({ name, max, min, chngHandler, value }) => (
  <input
    type="time"
    name={name}
    max={max || null}
    min={min || null}
    onChange={chngHandler}
    value={value}
    required
  />
);

TimeField.propTypes = {
  name: PropTypes.string.isRequired,
  max: PropTypes.string,
  min: PropTypes.string,
  chngHandler: PropTypes.func,
  value: PropTypes.string,
};

export default TimeField;
