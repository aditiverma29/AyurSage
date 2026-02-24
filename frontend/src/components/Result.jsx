import { useLocation, useNavigate } from "react-router-dom";
import "../style.css";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;

  if (!data)
    return (
      <div className="home-container">
        <h1 className="home-title">⚠ No result found</h1>
        <p>Please complete the assessment first.</p>
        <button className="next-btn" onClick={() => navigate("/predict-dosha")}>
          Start Assessment →
        </button>
      </div>
    );

  const { result, details } = data;

  const today = new Date().toLocaleDateString();

  // 🔥 Ayurvedic Intelligent Result System
  const doshaContent = {
    Vata: {
      summary:
        "Vata dosha is governed by air and ether. Vata individuals are creative and energetic but may become anxious or experience dryness when imbalanced.",
      diet: [
        "Eat warm and well-cooked meals, avoid cold foods.",
        "Include root vegetables and ghee.",
        "Use warming spices like ginger, cumin, clove.",
        "Avoid fasting and irregular eating patterns.",
      ],
      lifestyle: [
        "Follow routine schedule.",
        "Practice grounding yoga like Hatha or Yin.",
        "Warm oil massage daily (Abhyanga).",
        "Avoid overstimulation and stress.",
      ],
      general: [
        "Sleep early and avoid skipping meals.",
        "Stay hydrated with warm water.",
        "Avoid cold weather exposure."
      ]
    },

    Pitta: {
      summary:
        "Pitta dosha is dominated by fire and water. Pittas are sharp, intelligent, and strong-willed but can become irritable and overheated when out of balance.",
      diet: [
        "Eat cooling foods like cucumber, coconut, aloe drinks.",
        "Avoid spicy, fried, or acidic foods.",
        "Drink mint or rose tea.",
        "Limit coffee and alcohol.",
      ],
      lifestyle: [
        "Practice meditation and calming breathwork.",
        "Avoid heat exposure and intense competition.",
        "Engage in swimming or relaxed fitness.",
        "Wear cool cotton fabrics.",
      ],
      general: [
        "Spend time in nature or near the moon.",
        "Avoid late-night work and screen time.",
        "Eat meals calmly and mindfully."
      ]
    },

    Kapha: {
      summary:
        "Kapha dosha is governed by earth and water. Kaphas are calm, nurturing, and grounded, but imbalance causes lethargy, weight gain, and slow digestion.",
      diet: [
        "Eat warm, light, and dry meals.",
        "Avoid dairy, sweets, and heavy meals.",
        "Use spices like black pepper, turmeric, mustard.",
        "Drink warm ginger tea daily.",
      ],
      lifestyle: [
        "Wake early before sunrise.",
        "Engage in energetic exercise.",
        "Avoid afternoon naps.",
        "Stimulate mind with new learning.",
      ],
      general: [
        "Keep living space warm and bright.",
        "Avoid overeating and emotional eating.",
        "Stay socially engaged and active."
      ]
    },
  };

  const guide = doshaContent[result] || doshaContent["Balanced"];

  return (
    <div className="home-container">
      
      <h1 className="home-title">Your Ayurvedic Result</h1>

      <div className="assessment-center">
        <div className="assessment-card" style={{ padding: "30px" }}>

          <h2 style={{ textAlign: "center", color: "#2d6a4f", fontSize:"22px" }}>
            🌿 Your Dominant Dosha: <b>{result}</b>
          </h2>

          <p style={{ textAlign: "center", marginBottom: "18px", fontStyle: "italic" }}>
            Assessment completed on <b>{today}</b>
          </p>

          <hr />

          {/* ---------------- SUMMARY ---------------- */}
          <h3>🧠 Summary</h3>
          <p>{guide.summary}</p>

          <br />

          {/* ---------------- DIET ---------------- */}
          <h3>🥗 Diet Suggestions</h3>
          <ul>
            {guide.diet.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <br />

          {/* ---------------- LIFESTYLE ---------------- */}
          <h3>🧘 Lifestyle Tips</h3>
          <ul>
            {guide.lifestyle.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <br />

          {/* ---------------- GENERAL ---------------- */}
          <h3>📌 General Recommendations</h3>
          <ul>
            {guide.general.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* ---------------- BUTTONS ---------------- */}
          <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "12px" }}>

            <button className="next-btn" onClick={() => navigate("/predict-dosha")}>
              🔄 Take Assessment Again
            </button>

            <button className="next-btn" style={{ background: "#2d6a4f" }} onClick={() => navigate("/dashboard")}>
              📊 Go to Dashboard
            </button>

            <button className="next-btn" style={{ background: "#b91c1c" }} onClick={() => navigate("/consultation")}>
              🩺 Book Consultation
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
