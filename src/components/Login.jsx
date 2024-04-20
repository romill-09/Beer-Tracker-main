import React, { useRef, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";
import "./css/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value.length < 6) {
      return setError("Passwords must be 6 or more characters");
    }

    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        userNameRef.current.value,
        passwordRef.current.value
      );
      history("/tracker");
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Failed to Login. Please try again.");
    }

    setLoading(false);
  }

  return (
    <AuthProvider>
      <React.Fragment>
        <div className="nav-wrapper">
          <Link to={auth ? "/login" : "/"} className="left brand-logo">
            <img src={"BT.png"} alt="Logo" className="photo" />
          </Link>
        </div>
        <div className="wrapper">
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <h1>IDENTIFICATION</h1>
            <div className="input-box" id="x">
              <input
                type="text"
                placeholder="Email"
                ref={userNameRef}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box" id="y">
              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
              <FaLock className="icon" />
            </div>
            <button disabled={loading} type="submit">
              PLEASE
            </button>
          </form>
          <div className="link-container">
            <Link className="signup-link" to="/signup">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </React.Fragment>
    </AuthProvider>
  );
};

export default Login;
