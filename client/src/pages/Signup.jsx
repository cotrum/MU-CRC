import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/Login.css";  

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirmPassword, setConfirmPassword]   = useState("");
  const [role, setRole] = useState("member");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setRole("member");

  if (password != confirmPassword){
    alert("Passwords do not match!");
    return;
  }

  if (!firstName || !lastName || !email || !password || !confirmPassword){
    alert("All fields must be filled in!");
    return;
  }

  const newUser = {
    firstName,
    lastName,
    email,
    password,
    role,
  };

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created successfully!");
      window.location.href = "/login";
    } else {
      alert(data.msg);
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
};


  return (
    <>
      

      <div className="page-container">
        <h1 className="page-title">Create an Account</h1>

        <div className="section-box cyber-border login-box">
          <p className="lead-text text-center">
            Register for access to the Monmouth University Cybersecurity Research Center.
          </p>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>

            <p className="login-hint text-center">
              Already have an account? <a href="/login">Log in</a>.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;