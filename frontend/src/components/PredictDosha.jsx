import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

export default function PredictDosha() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    diet: "",
    season: "",
    sleep: "",
    stress: "",
    symptoms: ""
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Detect dosha + save to DB + navigate
  const handleSubmit = async () => {
    let detectedDosha = "Balanced";

    if (form.sleep === "Poor") detectedDosha = "Vata";
    if (form.stress === "High") detectedDosha = "Pitta";
    if (form.diet === "Non-Vegetarian" && form.season === "Winter") detectedDosha = "Kapha";

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/dosha",
        { result: detectedDosha, details: form },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/result", { state: { result: detectedDosha, details: form } });

    } catch (err) {
      console.error(err);
      alert(" Failed to save assessment. Check backend.");
    }
  };

  return (
    <div className="home-container predict-container">
      
      {/* NAVBAR */}
      <div className="home-navbar">
        <div className="brand-mini"><div className="logo-circle">
            <img src="/images/logo.jpeg" alt="Ayur Logo" className="logo-img" />
          </div> AyurSage</div>

        <div className="nav-menu">
          <button className="nav-pill active">Predict Dosha</button>
          <button className="nav-pill" onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>

        <button 
          className="logout-pill"
          onClick={() => { localStorage.removeItem("token"); navigate("/"); }}
        >
          Sign Out
        </button>
      </div>

      {/* PAGE TITLE */}
      <h1 className="home-title">Dosha Assessment</h1>
      <p className="home-sub">Complete this 3-step assessment to discover your Ayurvedic body type.</p>

      {/* STEPS INDICATOR */}
      <div className="step-container">
        {[1, 2, 3].map((num) => (
          <div 
            key={num} 
            className={`step ${step === num ? "active" : ""}`} 
            onClick={() => setStep(num)}
          >
            {num}
          </div>
        ))}
      </div>

      {/* FORM CARD CENTER */}
      <div className="assessment-center">
        <div className="assessment-card">

          {/* -------- STEP 1 -------- */}
          {step === 1 && (
            <>
              <h3 className="form-title">👤 Personal Information</h3>

              <label>Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />

              <label>Gender</label>
              <div className="choice-group">
                {["Male", "Female", "Other"].map((g) => (
                  <div
                    key={g}
                    className={`choice-btn ${form.gender === g ? "selected" : ""}`}
                    onClick={() => setForm({ ...form, gender: g })}
                  >
                    {g}
                  </div>
                ))}
              </div>

              <button className="next-btn" onClick={nextStep}>Next →</button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h3 className="form-title">🌿 Lifestyle Habits</h3>

              <label>Diet Type</label>
              <select 
                value={form.diet}
                onChange={(e) => setForm({ ...form, diet: e.target.value })}
              >
                <option value="">Select diet pattern</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>

              <label>Season</label>
              <select 
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
              >
                <option value="">Select season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Monsoon">Monsoon</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </select>

              <label>Sleep Quality</label>
              <select 
                value={form.sleep}
                onChange={(e) => setForm({ ...form, sleep: e.target.value })}
              >
                <option value="">Select sleep quality</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>

              <label>Stress Level</label>
              <select 
                value={form.stress}
                onChange={(e) => setForm({ ...form, stress: e.target.value })}
              >
                <option value="">Select stress level</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>

              <div className="button-row">
                <button className="back-btn" onClick={prevStep}>← Back</button>
                <button className="next-btn" onClick={nextStep}>Next →</button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h3 className="form-title">🩺 Current Symptoms</h3>

              <textarea
                placeholder="Describe your current symptoms..."
                value={form.symptoms}
                onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
              ></textarea>

              <div className="button-row">
                <button className="back-btn" onClick={prevStep}>← Back</button>
                <button className="next-btn" onClick={handleSubmit}>Submit</button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
