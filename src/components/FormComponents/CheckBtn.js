import React from "react";
import PropTypes from "prop-types";

const CheckBtn = ({ id, name }) => (
<div key={id + 1} className="form-check-inline">
    <label className="form-check-label" htmlFor={name}>
      <input
        type="checkbox"
        className="form-check-input towns"
        id={name}
        value={name}
      />
      {name}
    </label>
  </div>
);

CheckBtn.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default CheckBtn;
