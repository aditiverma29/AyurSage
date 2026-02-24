import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const API = "http://localhost:5000";

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  // If already logged in → send to home
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  const handleSignup = async () => {
    try {
      await axios.post(`${API}/signup`, data);
      alert("Account created successfully 🎉 Please login.");
      navigate("/login");
    } catch (err) {
      alert("User already exists or error occurred ❌");
    }
  };

  return (
    <div className="auth-page">
      <div className="wrapper">
        <div className="card">
          <div className="logo-circle">
            <div className="logo-circle">
            <img src="/images/logo.jpeg" alt="Ayur Logo" className="logo-img" />
          </div>
          </div>

          <div className="brand-title">AyurSage</div>
          <p className="tagline">Discover your dosha and balance your wellness</p>

          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <button className="button" onClick={handleSignup}>
            Create Account
          </button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
