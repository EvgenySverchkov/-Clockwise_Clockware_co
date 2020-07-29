import React from "react";
import PropTypes from "prop-types";

const TextField = ({ id, name, chngHandler, value }) => (
  <div className="col-sm-8 col-md-8">
    <input
      id={id}
      type="text"
      name={name || null}
      className="form-control"
      onChange={chngHandler || null}
      value={value}
      required
    />
  </div>
);

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  chngHandler: PropTypes.func,
  value: PropTypes.node,
};

export default TextField;
