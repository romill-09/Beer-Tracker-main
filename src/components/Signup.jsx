import React from "react";
import "./css/signup.css";
import { FaUser, FaLock } from "react-icons/fa";

const Signup = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>IDENTIFICATION</h1>
        <div className="input-box" id = "x">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box" id = "y">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>

        <button type="submit">PLEASE</button>
      </form>
    </div>
  );
};

export default Signup;