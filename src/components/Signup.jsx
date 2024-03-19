import React from "react";
import "./css/signup.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Signup = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>IDENTIFICATION</h1>
        <div className="input-box" id="x">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box" id="y">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>

        {/* Use Link component to navigate to the Tracker page */}
        <Link to="/tracker">
          <button type="submit">PLEASE</button>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
