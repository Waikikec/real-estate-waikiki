import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="logo_image" />
          <span>WaikikiEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        <a href="/">Login</a>
        <a href="/" className="register">
          Register
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
