import React from "react";

const SubmitButton = ({isLoad}) => (
    <div className="row justify-content-sm-center col-12">
        <input type="submit" value={isLoad ? "Loading..." : "Sign up"} className="btn btn-primary col-12 col-sm-4 mt-3" />
  </div>
);

export default SubmitButton;