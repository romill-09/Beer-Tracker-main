import React from "react";
import "./css/signup.css";
import { FaUser, FaLock } from "react-icons/fa";

export const Signup = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Idenitfy Yourself</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>

        <button type="submit">Please</button>
      </form>
    </div>
  );
};
