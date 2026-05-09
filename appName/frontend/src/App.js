import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendUrl = "http://localhost:5000";

  // Calls Flask directly on its exposed port.
  async function callBackend() {
    setLoading(true);
    try {
      const res = await fetch(backendUrl + "/hello");
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error: could not reach backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "80px auto", textAlign: "center" }}>
      <h1>React + Flask + Docker</h1>
      <p>Your app is running! Click the button to call the Python backend.</p>

      <button
        onClick={callBackend}
        style={{
          padding: "12px 28px",
          fontSize: 16,
          borderRadius: 8,
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Calling API..." : "Call Flask API"}
      </button>

      {message && (
        <p style={{ marginTop: 24, padding: 16, background: "#f0fdf4", borderRadius: 8, color: "#166534" }}>
          Response: <strong>{message}</strong>
        </p>
      )}
    </div>
  );
}
