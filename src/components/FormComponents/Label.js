import React from "react";

const Label = ({ children, forId }) => (
  <label
    htmlFor={forId}
    className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold"
  >
    {children}
  </label>
);

export default Label;
