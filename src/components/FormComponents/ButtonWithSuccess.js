import React from "react";

const ButtonWithSuccess = ({isLoad, btnText}) => {
  return (
    <div className="form-group float-right mt-3">
        <input
          type="submit"
          value={isLoad ? "Loading..." : btnText}
          className="btn btn-primary"
        />
    </div>
    );
};

export default ButtonWithSuccess;