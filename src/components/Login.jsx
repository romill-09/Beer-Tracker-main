import React, { useRef, useState, useEffect } from "react";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import "./css/login.css";

const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const history = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        passwordRef.current &&
        !passwordRef.current.contains(event.target) &&
        userNameRef.current &&
        !userNameRef.current.contains(event.target)
      ) {
        setError("");
        setPasswordError("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePasswordChange = (evt) => {
    const password = evt.target.value;
    if (password.length < 6) {
      setPasswordError("Passwords must be 6 or more characters");
    } else {
      setPasswordError("");
    }
  };

  const handleFieldBlur = () => {
    setError("");
    setPasswordError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value.length < 6) {
      return setPasswordError("Passwords must be 6 or more characters");
    }

    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        userNameRef.current.value,
        passwordRef.current.value,
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
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>KNOCK KNOCK</h1>
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                ref={passwordRef}
                onChange={handlePasswordChange}
                onBlur={handleFieldBlur}
                required
              />
              {showPassword ? (
                <FaEyeSlash
                  className="icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye className="icon" onClick={() => setShowPassword(true)} />
              )}
            </div>
            {passwordError && (
              <Alert
                severity="error"
                sx={{ mt: 1, mb: 1, opacity: 1, zIndex: 1 }}
              >
                {passwordError}
              </Alert>
            )}
            {error && (
              <Alert
                severity="error"
                sx={{ mt: 1, mb: 1, opacity: 1, zIndex: 1 }}
              >
                {error}
              </Alert>
            )}
            <button disabled={loading} type="submit">
              I'm so desperate
            </button>
          </form>
          {/* <div className="link-container">
            <Link className="signup-link" to="/signup">
              Don't have an account? Sign up
            </Link>
          </div> */}
        </div>
      </React.Fragment>
    </AuthProvider>
  );
};

export default Login;
