import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Consultation() {
  const navigate = useNavigate();

  
  const practitioners = [
    { id: 1, name: "Dr. Meera Sharma", specialty: "Ayurvedic Physician", experience: "10+ years" },
    { id: 2, name: "Dr. Arjun Ravi", specialty: "Panchakarma Expert", experience: "8+ years" },
    { id: 3, name: "Dr. Kavya Singhal", specialty: "Holistic Wellness & Diet", experience: "5+ years" }
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointment, setAppointment] = useState({
    name: "",
    age: "",
    concern: "",
    date: "",
    time: ""
  });

  const handleSubmit = () => {
    if (!appointment.name || !appointment.age || !appointment.concern || !appointment.date || !appointment.time) {
      return alert("Please fill all fields!");
    }

    alert(`✔ Appointment booked with ${selectedDoctor.name}`);
    navigate("/dashboard");
  };

  return (
    <div className="home-container">

      <div className="home-navbar">
        <div className="brand-mini"><div className="logo-circle">
            <img src="/images/logo.jpeg" alt="Ayur Logo" className="logo-img" />
          </div> AyurSage</div>
        <button className="logout-pill" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
      </div>

      <h1 className="home-title">Book Consultation</h1>
      <p className="home-sub">Choose your practitioner and schedule an appointment.</p>


      {/* ---------- STEP 1: Select Doctor ---------- */}
      {!selectedDoctor && (
        <div className="assessment-center">
          <div className="assessment-card">
            <h3>👨‍⚕️ Select Practitioner</h3>

            {practitioners.map((doc) => (
              <div
                key={doc.id}
                className="card-lite"
                style={{ cursor: "pointer", margin: "12px 0" }}
                onClick={() => setSelectedDoctor(doc)}
              >
                <h3>{doc.name}</h3>
                <p>{doc.specialty}</p>
                <small>Experience: {doc.experience}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Appointment Form */}
      {selectedDoctor && (
        <div className="assessment-center">
          <div className="assessment-card">

            <h3 style={{ marginBottom: "10px" }}>📋 Appointment With</h3>
            <p style={{ fontWeight: "bold", color: "#2d6a4f" }}>{selectedDoctor.name}</p>

            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={appointment.name}
              onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
            />

            <label>Age</label>
            <input
              type="number"
              placeholder="Enter age"
              value={appointment.age}
              onChange={(e) => setAppointment({ ...appointment, age: e.target.value })}
            />

            <label>Health Concern</label>
            <textarea
              placeholder="Describe your condition..."
              value={appointment.concern}
              onChange={(e) => setAppointment({ ...appointment, concern: e.target.value })}
            ></textarea>

            <label>Date</label>
            <input
              type="date"
              value={appointment.date}
              onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
            />

            <label>Time</label>
            <input
              type="time"
              value={appointment.time}
              onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
            />

            <button className="next-btn" style={{ marginTop: "15px" }} onClick={handleSubmit}>
              Confirm Appointment →
            </button>

            <button className="back-btn" style={{ marginTop: "10px" }} onClick={() => setSelectedDoctor(null)}>
              ← Choose Different Practitioner
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
