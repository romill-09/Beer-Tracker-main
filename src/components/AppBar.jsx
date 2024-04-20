import React from "react";
import { Link } from "react-router-dom";
import "./css/appbar.css";
import { auth } from "../config/firebase";

const Appbar = ({ auth }) => {
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <Link to={auth ? "/tracker" : "/tracker"} className="left brand-logo">
          <img src={"BT.png"} alt="Logo" className="photo" />
        </Link>
      </div>
    </nav>
  );
};

export default Appbar;
