import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ Navbar ~ open:", open);

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
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="menu_icon"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Login</a>
          <a href="/">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
