// components/Header.js
import React from "react";
import "../styles/Header.css";
import { IoLocationOutline } from "react-icons/io5";
import logo from "../assets/globaltrack_logo.jpeg"

const Header = () => {
  return (
    <header className="header d-flex align-items-center mb-3  ">
      <div className =  "d-flex align-items-center">
        <IoLocationOutline size={40}/>
        <span className="name">Fleet Management Dashboard</span>
      </div>
      <img src={logo} alt="Logo" className="logo" />
    </header>
  );
};

export default Header;
