import React from "react";
import PropTypes from "prop-types";

const SubmitBtn = ({ loading }) => (
  <div className="form-group float-right mt-3">
    <input
      type="submit"
      value={loading ? "Loading..." : "Book now"}
      className="btn btn-primary"
    />
  </div>
);

SubmitBtn.propTypes = {
  loading: PropTypes.bool,
};

export default SubmitBtn;
