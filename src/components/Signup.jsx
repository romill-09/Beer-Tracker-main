import React, { useRef, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "@mui/material";

const Signup = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
      await signup(userNameRef.current.value, passwordRef.current.value);
      history.push("/tracker"); // Redirect to tracker page upon successful signup
    } catch {
      setError("Failed to Register");
    }

    setLoading(false);
  }

  return (
    <AuthProvider>
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
        <Link to="/signup">Already have an account? Log in</Link>
      </div>
    </AuthProvider>
  );
};

export default Signup;
