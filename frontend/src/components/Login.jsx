import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const API = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  // If already logged in → redirect to home
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, data);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful 🌿");
      navigate("/home");
    } catch {
      alert("Wrong Email or Password ❌");
    }
  };

  return (
    <div className="auth-page">   {/* <--- FIX added */}
      <div className="wrapper">
        <div className="card">

          <div className="logo-circle">
            <img src="/images/logo.jpeg" alt="Ayur Logo" className="logo-img" />
          </div>

          <div className="brand-title">AyurSage</div>
          <p className="tagline">Discover your dosha and balance your wellness</p>

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

          <button className="button" onClick={handleLogin}>
            Sign In
          </button>

          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
