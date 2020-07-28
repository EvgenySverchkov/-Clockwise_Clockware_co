import React from "react";

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

export default PasswordField;
