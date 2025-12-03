import React, { useState } from "react";
import Footer from "../components/Footer.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/Login.css"; 
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login attempted with:", email, password);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Login failed.");
        return;
      }

      // Store all user data properly
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedInUser", data.user.firstName);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user)); // Store full user object

      // Only show message for nonmember role
      if (data.user.role === 'nonmember') {
        alert('Your membership is pending admin approval. You can browse the site but cannot upload writeups yet.');
      }

      if (onLogin) onLogin(); 

      console.log("Logged in:", data.user);
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login.");
    }
  };

  return (
    <>
      <div className="page-container">
        <h1 className="page-title">Login</h1>

        <div className="section-box cyber-border login-box">
          <p className="lead-text text-center">
            Access your Monmouth University Cybersecurity Research Center account.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
             Don't have an account? <Link to="/register">Register here</Link>.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;