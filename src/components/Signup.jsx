import React, { useRef, useState, useEffect } from "react";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Signup = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordPrompt, setPasswordPrompt] = useState("");
  const history = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        passwordRef.current &&
        !passwordRef.current.contains(event.target) &&
        confirmpasswordRef.current &&
        !confirmpasswordRef.current.contains(event.target) &&
        userNameRef.current &&
        !userNameRef.current.contains(event.target)
      ) {
        setUsernameError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setPasswordPrompt("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (usernameError) {
      const timer = setTimeout(() => {
        setUsernameError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [usernameError]);

  const handleNameChange = (evt) => {
    const newName = evt.target.value.replace(/[^a-z0-9@.]/g, "");
    if (evt.target.value !== newName) {
      setUsernameError(
        "Only lowercase letters, numbers, '@' and '.' are allowed",
      );
    } else {
      setUsernameError("");
    }
    userNameRef.current.value = newName;
  };

  const handlePasswordChange = (evt) => {
    const password = evt.target.value;
    if (password.length === 1) {
      setPasswordPrompt("For God’s Sake use four characters at least");
    } else if (password.length >= 4 && !/\d/.test(password)) {
      setPasswordPrompt("Add a bloody number!");
    } else if (/\d/.test(password) && !/[!@#$%^&*]/.test(password)) {
      setPasswordPrompt(
        "Add a special symbol goddamnit. You never learn, do you?",
      );
    } else {
      setPasswordPrompt("");
    }
  };

  const handleFieldBlur = () => {
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPasswordPrompt("");
  };

  const handleFieldFocus = (field) => {
    if (field === "username" && userNameRef.current.value) {
      handleNameChange({ target: userNameRef.current });
    }
    if (field === "password" && passwordRef.current.value) {
      handlePasswordChange({ target: passwordRef.current });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return setConfirmPasswordError("Do you have a memory problem?");
    }
    if (passwordRef.current.value.length < 6) {
      return setPasswordError("Passwords must be 6 or more characters");
    }

    try {
      setUsernameError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        userNameRef.current.value,
        passwordRef.current.value,
      );
      history("/login");
    } catch (error) {
      console.error("Registration error:", error.message);
      setPasswordError("Failed to register. Please try again.");
    }

    setLoading(false);
  }

  return (
    <AuthProvider>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>JOIN THE CULT</h1>
          <div
            className={`input-box ${usernameError ? "has-error" : ""}`}
            id="x"
          >
            <input
              type="text"
              id="myInput"
              placeholder="Username"
              ref={userNameRef}
              onChange={handleNameChange}
              onFocus={() => handleFieldFocus("username")}
              onBlur={handleFieldBlur}
              required
            />
            <FaUser className="icon" />
            {usernameError && (
              <Alert
                severity="error"
                sx={{
                  mt: 1,
                  mb: 1,
                  opacity: 1,
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                {usernameError}
              </Alert>
            )}
          </div>
          <div
            className={`input-box ${passwordError || passwordPrompt ? "has-error" : ""}`}
            id="y"
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={passwordRef}
              onChange={handlePasswordChange}
              onFocus={() => handleFieldFocus("password")}
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
            {passwordPrompt && (
              <Alert
                severity="info"
                sx={{
                  mt: 1,
                  mb: 1,
                  opacity: 1,
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                {passwordPrompt}
              </Alert>
            )}
            {passwordError && (
              <Alert
                severity="error"
                sx={{
                  mt: 1,
                  mb: 1,
                  opacity: 1,
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                {passwordError}
              </Alert>
            )}
          </div>
          <div
            className={`input-box ${confirmPasswordError ? "has-error" : ""}`}
            id="z"
          >
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmpasswordRef}
              onFocus={handleFieldBlur}
              onBlur={handleFieldBlur}
              required
            />
            <FaLock className="icon" />
            {confirmPasswordError && (
              <Alert
                severity="error"
                sx={{
                  mt: 1,
                  mb: 1,
                  opacity: 1,
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                {confirmPasswordError}
              </Alert>
            )}
          </div>
          <div
            className={`button-container ${usernameError || passwordError || confirmPasswordError || passwordPrompt ? "shifted" : ""}`}
          >
            <button className="button" disabled={loading} type="submit">
              PLEASE
            </button>
          </div>
        </form>
        <div className="link-container">
          <Link className="signup-link" to="/login">
            Wasted time before? Login
          </Link>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Signup;
