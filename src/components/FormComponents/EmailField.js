import React from "react";

const EmailField = ({ id, chngHandler, value }) => (
  <div className="col-sm-8 col-md-8">
    <input
      id={id}
      type="email"
      name="email"
      className="form-control"
      onChange={chngHandler}
      value = {value}
      required
    />
  </div>
);

export default EmailField;
