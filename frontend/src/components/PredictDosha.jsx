import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

export default function PredictDosha() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    Age: "",
    Gender: "",
    Prakriti: "Vata", // default (model requires it)
    Symptoms: "",
    "Stress Level": "",
    "Sleep Pattern": "",
    "Diet Type": "",
    Season: "",
    Climate: "Cold" // default
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      // 🔥 Call ML backend route
      const response = await axios.post(
        "http://localhost:5000/api/ml/predict",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const data = response.data;

      // Optional: Save assessment history
      await axios.post(
        "http://localhost:5000/api/dosha",
        { result: data.predicted_dosha, details: form },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/result", { state: { result: data } });

    } catch (err) {
      console.error("Prediction Error:", err);
      alert("ML prediction failed. Make sure Flask server is running.");
    }
  };

  return (
    <div className="home-container predict-container">

      {/* NAVBAR */}
      <div className="home-navbar">
        <div className="brand-mini">
          <div className="logo-circle">
            <img src="/images/logo.jpeg" alt="Ayur Logo" className="logo-img" />
          </div>
          AyurSage
        </div>

        <div className="nav-menu">
          <button className="nav-pill active">Predict Dosha</button>
          <button className="nav-pill" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>

        <button
          className="logout-pill"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Sign Out
        </button>
      </div>

      <h1 className="home-title">Dosha Assessment</h1>
      <p className="home-sub">
        Complete this 3-step assessment to discover your Ayurvedic body type.
      </p>

      {/* STEP INDICATOR */}
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

      <div className="assessment-center">
        <div className="assessment-card">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h3 className="form-title">👤 Personal Information</h3>

              <label>Age</label>
              <input
                type="number"
                value={form.Age}
                onChange={(e) =>
                  setForm({ ...form, Age: e.target.value })
                }
              />

              <label>Gender</label>
              <div className="choice-group">
                {["Male", "Female", "Other"].map((g) => (
                  <div
                    key={g}
                    className={`choice-btn ${
                      form.Gender === g ? "selected" : ""
                    }`}
                    onClick={() =>
                      setForm({ ...form, Gender: g })
                    }
                  >
                    {g}
                  </div>
                ))}
              </div>

              <button className="next-btn" onClick={nextStep}>
                Next →
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h3 className="form-title">🌿 Lifestyle Habits</h3>

              <label>Diet Type</label>
              <select
                value={form["Diet Type"]}
                onChange={(e) =>
                  setForm({ ...form, "Diet Type": e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>

              <label>Season</label>
              <select
                value={form.Season}
                onChange={(e) =>
                  setForm({ ...form, Season: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Monsoon">Monsoon</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </select>

              <label>Sleep Pattern</label>
              <select
                value={form["Sleep Pattern"]}
                onChange={(e) =>
                  setForm({ ...form, "Sleep Pattern": e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Insomnia">Insomnia</option>
              </select>

              <label>Stress Level</label>
              <select
                value={form["Stress Level"]}
                onChange={(e) =>
                  setForm({ ...form, "Stress Level": e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>

              <div className="button-row">
                <button className="back-btn" onClick={prevStep}>
                  ← Back
                </button>
                <button className="next-btn" onClick={nextStep}>
                  Next →
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h3 className="form-title">🩺 Current Symptoms</h3>

              <textarea
                placeholder="Describe your symptoms..."
                value={form.Symptoms}
                onChange={(e) =>
                  setForm({ ...form, Symptoms: e.target.value })
                }
              />

              <div className="button-row">
                <button className="back-btn" onClick={prevStep}>
                  ← Back
                </button>
                <button className="next-btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}