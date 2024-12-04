import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Reuse Header if necessary
import "./HomePage.css"; // Import existing styles
import "./SignupPage.css";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login-page");
      } else {
        const data = await response.json();
        setError(data.detail || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred while connecting to the server. Please try again.");
    }
  }

  return (
    <div className="home-page">
      <div className="login-container">
        <h1 className="login-title">Create a new account</h1>
        <form className="login-form" onSubmit={handleSignup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <p className="signup-text">
          Already have an account? <Link to="/login-page">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
