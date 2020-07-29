import React from "react";

import Logo from "./Logo";
import NavList from "./NavBtnsList";

function Header() {
  return (
    <header className="masthead mb-auto">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Logo>Clockwise Co.</Logo>
        <NavList />
      </nav>
    </header>
  );
}

export default Header;
