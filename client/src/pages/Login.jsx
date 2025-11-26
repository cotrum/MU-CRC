import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", username, password);
    // Backend login logic will go here
  };

  return (
    <>
      <Header />

      <div className="page-container">
        <h1 className="page-title">Login</h1>

        <div className="section-box cyber-border login-box">
          <p className="lead-text text-center">
            Access your Monmouth University Cybersecurity Research Center account.
          </p>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Log In
            </button>

            <p className="login-hint text-center">
              Don’t have an account? <a href="/register">Register here</a>.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
