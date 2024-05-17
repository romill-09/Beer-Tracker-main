import React, { useRef, useState, useEffect } from "react";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa"; // Import FaEye and FaEyeSlash
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
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [passwordPrompt, setPasswordPrompt] = useState(""); // State to manage password prompts
  const history = useNavigate();

  useEffect(() => {
    // Event listener to detect clicks outside the password input
    function handleClickOutside(event) {
      if (passwordRef.current && !passwordRef.current.contains(event.target)) {
        setShowPassword(false); // Hide password when clicked outside the input
      }
    }

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      setPasswordPrompt("Add a bloody number sucker");
    } else if (/\d/.test(password) && !/[!@#$%^&*]/.test(password)) {
      setPasswordPrompt(
        "Add a special symbol goddamnit. You don’t fucking learn, do you?",
      );
    } else {
      setPasswordPrompt("");
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
          <div className="input-box" id="x">
            <input
              type="text"
              id="myInput"
              placeholder="Username"
              ref={userNameRef}
              onChange={handleNameChange}
              required
            />
            <FaUser className="icon" />
            {usernameError && <Alert severity="error">{usernameError}</Alert>}
          </div>
          <div className="input-box" id="y">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              ref={passwordRef}
              onChange={handlePasswordChange}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                className="icon" // Eye slash icon when password is visible
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="icon" // Eye icon to show password
                onClick={() => setShowPassword(true)}
              />
            )}
            {passwordPrompt && <Alert severity="info">{passwordPrompt}</Alert>}
            {passwordError && <Alert severity="error">{passwordError}</Alert>}
          </div>
          <div className="input-box" id="z">
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmpasswordRef}
              required
            />
            <FaLock className="icon" />
            {confirmPasswordError && (
              <Alert severity="error">{confirmPasswordError}</Alert>
            )}
          </div>
          <div className="button-container">
            <button className="button" disabled={loading} type="submit">
              PLEASE
            </button>
          </div>
        </form>
        <div className="link-container">
          <Link className="signup-link" to="/login">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Signup;
