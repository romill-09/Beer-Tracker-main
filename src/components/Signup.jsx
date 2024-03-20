import React, { useRef, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";
import "./css/signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Corrected import
import { auth } from "../config/firebase";

const Signup = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Passwords must be 6 or more characters");
    }

    try {
      setError("");
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        userNameRef.current.value,
        passwordRef.current.value
      );
      history("/login");
    } catch (error) {
      console.error("Registration error:", error.message);
      setError("Failed to register. Please try again.");
    }

    setLoading(false);
  }

  return (
    <AuthProvider>
      <React.Fragment>
        <div className="wrapper">
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <h1>IDENTIFICATION</h1>
            <div className="input-box" id="x">
              <input
                type="text"
                placeholder="Username"
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
            <div className="input-box" id="z">
              <input
                type="password"
                placeholder="Confirm Password"
                ref={confirmpasswordRef}
                required
              />
              <FaLock className="icon" />
            </div>
            <button disabled={loading} type="submit">
              PLEASE
            </button>
          </form>
          <div className="link-container">
            <Link className="signup-link" to="/login">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </React.Fragment>
    </AuthProvider>
  );
};

export default Signup;
