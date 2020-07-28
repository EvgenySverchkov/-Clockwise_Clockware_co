import React from "react";

const TextField = ({ id, name, chngHandler, value }) => (
  <div className="col-sm-8 col-md-8">
    <input id={id} type="text" name={name||null} className="form-control" onChange={chngHandler||null} value={value} required />
  </div>
);

export default TextField;
