// components/Header.js
import React from "react";
import "../styles/Header.css";  // Import the CSS for the Header component

const Header = () => {
  return (
    <header className="header d-flex align-items-center">
      <img src="your-logo.png" alt="Logo" className="logo" />
      <span className="name">Fleet Management Dashboard</span>
    </header>
  );
};

export default Header;
