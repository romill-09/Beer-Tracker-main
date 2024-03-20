import React from "react";
import "./css/req.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Req = () => {
  return (
    <div className="container">
      <form action="">
        <h1>PLEAD A FAVOUR!</h1>
        <div className="input-box" id="a">
          <input type="text" placeholder="Date" required />
        </div>

        <div className="input-box" id="b">
          <input type="text" placeholder="Point of favour" required />
        </div>

        <div className="input-box" id="c">
          <input type="text" placeholder="Peasant" required />
        </div>

        <div className="input-box" id="d">
          <input type="text" placeholder="Patron" required />
        </div>

        <div className="input-box" id="e">
          <input type="text" placeholder="Beers Promised" required />
        </div>

        <Link to="/tracker">
          <button type="submit">PLEASE</button>
        </Link>
      </form>
    </div>
  );
};

export default Req;
