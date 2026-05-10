import img from "../heatmap.png";
// import { useState } from "react";

// export default function Home() {
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const backendUrl = "http://localhost:5000";

//   async function callBackend() {
//     setLoading(true);
//     try {
//       const res = await fetch(backendUrl + "/hello");
//       const data = await res.json();
//       setMessage(data.message);
//     } catch (err) {
//       setMessage("Error: could not reach backend");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <body>
//       <h1>React + Flask + Docker</h1>
//       <p>Your app is running! Click the button to call the Python backend.</p>

//       <button
//         onClick={callBackend}
//         style={{
//           padding: "12px 28px",
//           fontSize: 16,
//           borderRadius: 8,
//           border: "none",
//           background: "#2563eb",
//           color: "white",
//           cursor: "pointer",
//         }}
//       >
//         {loading ? "Calling API..." : "Call Flask API"}
//       </button>

//       {message && (
//         <p style={{ marginTop: 24, padding: 16, background: "#f0fdf4", borderRadius: 8, color: "#166534" }}>
//           Response: <strong>{message}</strong>
//         </p>
//       )}
//     </body>
//   );
// }

import { useNavigate } from "react-router-dom";

// ─── Constants ────────────────────────────────────────────────────────────────
// Average daily CO₂ waste from running shiftable appliances at random times
// vs. optimal zero-emission windows. Based on CAISO_NORTH average MOER (~900
// lbs/MWh) × 16.6 kWh daily shiftable load / 1000.
const AVG_DAILY_WASTE_LBS = 6.03;

// ─── Sub-components ───────────────────────────────────────────────────────────
function FeatureCard({ icon, title, body }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: "28px 24px",
      boxShadow: "0 10px 24px rgba(2,6,23,0.08)",
    }}>
      <div style={{
        fontSize: "1.6rem",
        marginBottom: 14,
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(14,165,164,0.10)",
        borderRadius: 10,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "Courier New, monospace",
        fontSize: "1rem",
        fontWeight: 700,
        color: "var(--text)",
        marginBottom: 10,
      }}>
        {title}
      </h3>
      <p className="passive" style={{ fontSize: "0.88rem", lineHeight: 1.75, margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

function StepRow({ number, title, body }) {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      <div style={{
        flexShrink: 0,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
      }}>
        <span className="data" style={{ fontSize: "1rem", color: "var(--primary)" }}>
          {number}
        </span>
      </div>
      <div>
        <h4 style={{
          fontFamily: "Courier New, monospace",
          fontSize: "0.97rem",
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 6,
        }}>
          {title}
        </h4>
        <p className="passive" style={{ fontSize: "0.87rem", lineHeight: 1.75, margin: 0 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 100px" }}>

      {/* ── Hero ── */}
      <div style={{ textAlign: "center", padding: "72px 0 64px" }}>
        <span className="passive" style={{
          display: "inline-block",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: "5px 14px",
          marginBottom: 24,
        }}>
          Grid-aware energy scheduling
        </span>

        <h1 style={{
          fontFamily: "Courier New, monospace",
          fontSize: "clamp(2rem, 6vw, 3.4rem)",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "var(--text)",
          margin: "0 auto 20px",
          maxWidth: 640,
        }}>
          Power
          <span style={{ color: "var(--primary)" }}>Cueue</span>
        </h1>

        <p className="passive" style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          maxWidth: 520,
          margin: "0 auto 36px",
        }}>
          PowerCue monitors real-time carbon intensity on your local grid and predicts
          the best times to run your heavy appliances, that way your normal household activity
          causes less pollution, and less harm.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/sign-up")}
            style={{
              padding: "12px 28px",
              borderRadius: 10,
              border: "none",
              background: "var(--primary)",
              color: "var(--button-text)",
              fontFamily: "Courier New, monospace",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(14,165,164,0.28)",
              transition: "filter 0.15s",
            }}
          >
            Get started — it's free
          </button>
          <button
            onClick={() => navigate("/about")}
            style={{
              padding: "12px 28px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
              fontFamily: "Courier New, monospace",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "filter 0.15s",
            }}
          >
            Learn more
          </button>
        </div>
      </div>

      {/* ── Divider ── */}
      <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

      {/* ── Sign-up incentive ── */}
      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--primary)",
        borderRadius: 14,
        padding: "36px 32px",
        textAlign: "center",
        boxShadow: "0 0 0 1px var(--primary), 0 10px 32px rgba(14,165,164,0.10)",
        marginBottom: 64,
      }}>
        <span className="passive" style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--primary)",
          display: "block",
          marginBottom: 14,
        }}>
          Did you know?
        </span>
        <p style={{
          fontFamily: "Courier New, monospace",
          fontSize: "clamp(1rem, 3vw, 1.35rem)",
          fontWeight: 700,
          color: "var(--text)",
          lineHeight: 1.4,
          maxWidth: 560,
          margin: "0 auto 10px",
        }}>
          The average person wastes{" "}
          <span className="data" style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", color: "var(--primary)" }}>
            {AVG_DAILY_WASTE_LBS} lbs
          </span>{" "}
          of CO₂ every day by running appliances at the wrong time.
        </p>
        <p className="passive" style={{
          fontSize: "0.9rem",
          lineHeight: 1.7,
          maxWidth: 480,
          margin: "0 auto 24px",
        }}>
          Sign in to see what your footprint looks like!
        </p>
        <button
          onClick={() => navigate("/sign-up")}
          style={{
            padding: "11px 26px",
            borderRadius: 10,
            border: "none",
            background: "var(--primary)",
            color: "var(--button-text)",
            fontFamily: "Courier New, monospace",
            fontWeight: 700,
            fontSize: "0.92rem",
            cursor: "pointer",
            boxShadow: "0 6px 14px rgba(14,165,164,0.24)",
          }}
        >
          See your impact →
        </button>
      </div>

      {/* ── Feature cards ── */}
      <div style={{ marginBottom: 72 }}>
        <span className="passive" style={{
          display: "block",
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--primary)",
          marginBottom: 16,
          textAlign: "center",
        }}>
          What PowerCue does
        </span>
        <h2 style={{
          fontFamily: "Courier New, monospace",
          fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
          fontWeight: 700,
          color: "var(--text)",
          textAlign: "center",
          marginBottom: 32,
        }}>
          Three numbers that change how you use electricity.
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 16,
        }}>
          <FeatureCard
            icon="⚡"
            title="Real-time grid signals"
            body="We pull live carbon intensity data every 5 minutes from WattTime's grid monitoring. When the grid flips to surplus renewables, you'll know."
          />
          <FeatureCard
            icon="📅"
            title="24-hour scheduling windows"
            body="See the cleanest upcoming windows for your washer, dryer, dishwasher, HVAC, oven, water heater, and EV — up to 24 hours ahead."
          />
          <FeatureCard
            icon="🌱"
            title="Your personal impact"
            body="Track your total CO₂ saved and the health harm you've avoided — compared to what an average person in your region would have caused."
          />
        </div>
      </div>

      {/* ── Heatmap section ── */}
      <div style={{ marginBottom: 72 }}>
        <span className="passive" style={{
          display: "block",
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--primary)",
          marginBottom: 16,
          textAlign: "center",
        }}>
          The grid in real time
        </span>
        <h2 style={{
          fontFamily: "Courier New, monospace",
          fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
          fontWeight: 700,
          color: "var(--text)",
          textAlign: "center",
          marginBottom: 12,
        }}>
          Renewable energy isn't everywhere at once.
        </h2>
        <p className="passive" style={{
          fontSize: "0.92rem",
          lineHeight: 1.75,
          textAlign: "center",
          maxWidth: 560,
          margin: "0 auto 28px",
        }}>
          This map shows the distribution of renewable energy generation across the
          continental US. The darker the green region is, the larger the energy output 
          of the area is composed of renewable energy.
        </p>

        {/* Image container — swap src for your actual heatmap image */}
        <div style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 10px 24px rgba(2,6,23,0.10)",
        }}>
          <img
            src={img}
            alt="Heatmap of renewable energy generation across the continental United States"
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
            }}
            onError={e => {
              // Fallback placeholder if image not found
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback shown if image fails to load */}
          <div style={{
            display: "none",
            height: 280,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 12,
          }}>
            <span style={{ fontSize: "2rem" }}>🗺️</span>
            <span className="passive" style={{ fontSize: "0.85rem" }}>
              Heatmap image — place your file at /public/heatmap.png
            </span>
          </div>
        </div>

        <p className="passive" style={{
          fontSize: "0.78rem",
          textAlign: "center",
          marginTop: 12,
        }}>
          Grid emissions data provided by{" "}
          <a
            href="https://watttime.org"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--primary)", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            WattTime
          </a>.
          Map updates every 5 minutes.
        </p>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        textAlign: "center",
        padding: "48px 24px",
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        boxShadow: "0 10px 24px rgba(2,6,23,0.08)",
      }}>
        <h2 style={{
          fontFamily: "Courier New, monospace",
          fontSize: "clamp(1.2rem, 3vw, 1.7rem)",
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 14,
        }}>
          Ready to use your electricity better?
        </h2>
        <p className="passive" style={{
          fontSize: "0.9rem",
          lineHeight: 1.75,
          maxWidth: 420,
          margin: "0 auto 28px",
        }}>
          Sign up in seconds with
          just your grid region and a willingness to start at the right time.
        </p>
        <button
          onClick={() => navigate("/sign-up")}
          style={{
            padding: "12px 32px",
            borderRadius: 10,
            border: "none",
            background: "var(--primary)",
            color: "var(--button-text)",
            fontFamily: "Courier New, monospace",
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(14,165,164,0.28)",
          }}
        >
          Create your free account
        </button>
      </div>

    </div>
  );
}
