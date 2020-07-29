import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ComeBackBtn = ({ backTo }) => (
  <div className="form-group float-left mt-3">
    <Link to={backTo} className="btn btn-primary">
      Сome back
    </Link>
  </div>
);

ComeBackBtn.propTypes = {
  backTo: PropTypes.string.isRequired,
};

export default ComeBackBtn;
