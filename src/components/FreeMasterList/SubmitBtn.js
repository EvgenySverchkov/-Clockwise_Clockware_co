import React from 'react';
import PropTypes from "prop-types";

const SubmitBtn = ({isLoad})=>(
    <div className="form-group float-right mt-3">
        <input
          type="submit"
          value={isLoad ? "Loading..." : "Book now"}
          className="btn btn-primary"
        />
      </div>
);

SubmitBtn.propTypes = {
  isLoad: PropTypes.bool
}

export default SubmitBtn;