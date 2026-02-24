import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">

      {/* - NAVBAR - */}
      <div className="home-navbar">
        <div className="brand-mini"><div className="logo-circle">
            <img src="/images/logo.jpeg" alt="Ayur Logo" className="logo-img" />
          </div> AyurSage</div>

        <div className="nav-menu">
          <button className="nav-pill active">Home</button>
          <button className="nav-pill" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>

        <button className="logout-pill" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      {/* - TITLE - */}
      <h1 className="home-title">Balance Your Wellness</h1>
      <p className="home-sub">
        Begin your personalized Ayurvedic journey based on Dosha & Prakriti insights.
      </p>

      {/* - FEATURE ROW -*/}
      <div className="features-row">

        {/* CARD 1 */}
        <div className="feature-box">
          <div className="card-icon">🌀</div>
          <h3>Predict Dosha</h3>
          <p>Discover your current dosha imbalance based on symptoms & lifestyle.</p>
          <button
            className="cta-link"
            onClick={() => navigate("/predict-dosha")}
          >
            Start Assessment ✨
          </button>
        </div>

        {/* CARD 2 */}
        <div className="feature-box">
          <div className="card-icon">🌱</div>
          <h3>Predict Prakriti</h3>
          <p>Understand your natural body constitution (Vata • Pitta • Kapha).</p>
          <button
            className="cta-link"
            onClick={() => navigate("/predict-prakriti")}
          >
            Start Assessment ✨
          </button>
        </div>

        {/* CARD 3 */}
        <div className="feature-box">
          <div className="card-icon">👩‍⚕️</div>
          <h3>Book Consultation</h3>
          <p>Speak with expert Ayurvedic practitioners for personalized healing.</p>
          <button
            className="cta-link"
            onClick={() => navigate("/consultation")}
          >
            View Practitioners ✨
          </button>
        </div>

      </div>
    </div>
  );
}
