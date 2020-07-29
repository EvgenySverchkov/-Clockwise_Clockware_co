import React from "react";

export default ({ title, children }) => (
  <div className="dropdown mr-1">
    <button
      className="btn btn-secondary dropdown-toggle"
      href="#"
      id="dropdownMenuLink"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {title}
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      {children}
    </div>
  </div>
);
