import React from "react";

const TextField = ({ id, name }) => (
  <div className="col-sm-8 col-md-8">
    <input id={id} type="text" name={name} className="form-control" required />
  </div>
);

export default TextField;
