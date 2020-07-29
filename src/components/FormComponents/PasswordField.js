import React from "react";
import PropTypes from "prop-types";

const PasswordField = ({ id }) => (
  <div className="col-sm-8 col-md-8">
    <input
      id={id}
      type="password"
      name="password"
      className="form-control"
      autoComplete="username"
      required
    />
  </div>
);

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PasswordField;
