import React from "react";
import PropTypes from "prop-types";

const SubmitButton = ({ isLoad, value }) => (
  <div className="row justify-content-sm-center col-12">
    <input
      type="submit"
      value={isLoad ? "Loading..." : value}
      className="btn btn-primary col-12 col-sm-4 mt-3"
    />
  </div>
);

SubmitButton.propTypes = {
  isLoad: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default SubmitButton;
