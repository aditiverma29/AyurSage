import { useLocation, useNavigate } from "react-router-dom";
import "../style.css";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 New ML Response
  const data = location.state?.result;

  if (!data)
    return (
      <div className="home-container">
        <h1 className="home-title">⚠ No result found</h1>
        <p>Please complete the assessment first.</p>
        <button
          className="next-btn"
          onClick={() => navigate("/predict-dosha")}
        >
          Start Assessment →
        </button>
      </div>
    );

  const predictedDosha = data.predicted_dosha;
  const predictedDisease = data.predicted_disease;
  const probabilities = data.dosha_probabilities;
  const treatment = data.treatment;

  const today = new Date().toLocaleDateString();

  // 🌿 Static Ayurvedic Guide (Optional but kept)
  const doshaContent = {
    Vata: {
      summary:
        "Vata dosha is governed by air and ether. Vata individuals are creative and energetic but may become anxious or experience dryness when imbalanced.",
    },
    Pitta: {
      summary:
        "Pitta dosha is dominated by fire and water. Pittas are sharp, intelligent, and strong-willed but can become irritable and overheated when out of balance.",
    },
    Kapha: {
      summary:
        "Kapha dosha is governed by earth and water. Kaphas are calm, nurturing, and grounded, but imbalance causes lethargy and slow digestion.",
    },
  };

  const guide = doshaContent[predictedDosha] || {};

  return (
    <div className="home-container">
      <h1 className="home-title">Your Ayurvedic Result</h1>

      <div className="assessment-center">
        <div className="assessment-card" style={{ padding: "30px" }}>

          {/* DOSHA */}
          <h2 style={{ textAlign: "center", color: "#2d6a4f", fontSize: "22px" }}>
            🌿 Your Dominant Dosha: <b>{predictedDosha}</b>
          </h2>

          {/* DISEASE */}
          <h3 style={{ textAlign: "center", color: "#b91c1c" }}>
            🩺 Predicted Disease: <b>{predictedDisease}</b>
          </h3>

          <p style={{ textAlign: "center", marginBottom: "18px", fontStyle: "italic" }}>
            Assessment completed on <b>{today}</b>
          </p>

          <hr />

          {/* SUMMARY */}
          {guide.summary && (
            <>
              <h3>🧠 Dosha Summary</h3>
              <p>{guide.summary}</p>
              <br />
            </>
          )}

          {/* CONFIDENCE */}
          {probabilities && (
            <>
              <h3>📊 Dosha Confidence Levels</h3>
              <ul>
                {Object.entries(probabilities).map(([key, value]) => (
                  <li key={key}>
                    {key}: {(value * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
              <br />
            </>
          )}

          {/* ML TREATMENT PLAN */}
          {treatment && (
            <>
              <h3>💊 Personalized Treatment Plan</h3>

              <p><strong>Therapy:</strong> {treatment.therapy}</p>
              <p><strong>Medicine:</strong> {treatment.medicine}</p>
              <p><strong>Diet Plan:</strong> {treatment.diet}</p>
              <p><strong>Exercise:</strong> {treatment.exercise}</p>

              <br />
            </>
          )}

          {/* BUTTONS */}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <button
              className="next-btn"
              onClick={() => navigate("/predict-dosha")}
            >
              🔄 Take Assessment Again
            </button>

            <button
              className="next-btn"
              style={{ background: "#2d6a4f" }}
              onClick={() => navigate("/dashboard")}
            >
              📊 Go to Dashboard
            </button>

            <button
              className="next-btn"
              style={{ background: "#b91c1c" }}
              onClick={() => navigate("/consultation")}
            >
              🩺 Book Consultation
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}