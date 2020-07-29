import React from "react";
import PropTypes from "prop-types";

const NumField = ({ max, min, id, value, chngHandler }) => (
  <div className="col-sm-3">
    <input
      id={id}
      className="form-control"
      type="number"
      min={min}
      max={max}
      onChange={chngHandler || null}
      value={value}
    />
  </div>
);

NumField.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default NumField;
