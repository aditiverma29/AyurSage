import axios from "axios";
import { useEffect, useState } from "react";
import "../style.css";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/dosha", {
      headers: { Authorization: `Bearer ${token}` }
    });

    setHistory(res.data);
  };

  return (
    <div className="home-container dashboard-center">
      <h1 className="home-title">📜 Your Assessment History</h1>

      {history.length === 0 ? (
        <p>No saved assessments yet.</p>
      ) : (
        history.map((r, index) => (
          <div key={index} className="card-lite" style={{ marginTop: "15px" }}>
            <h3>🧘 Result: {r.result}</h3>
            <p>📅 {new Date(r.date).toLocaleString()}</p>

            <ul style={{ textAlign: "left" }}>
              <li>Age: {r.form.age}</li>
              <li>Gender: {r.form.gender}</li>
              <li>Diet: {r.form.diet}</li>
              <li>Season: {r.form.season}</li>
              <li>Sleep: {r.form.sleep}</li>
              <li>Stress: {r.form.stress}</li>
              <li>Symptoms: {r.form.symptoms}</li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
