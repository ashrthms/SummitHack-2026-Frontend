// import { useState } from "react";

// export default function ImpactCalculator() {
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

//   return (<div>impact</div>)}

import { useState, useEffect } from "react";

// ─── Placeholder Data ─────────────────────────────────────────────────────────
const USER_DATA = {
  dailyCarbonSaved_lbs: 0.0,    // from avg_daily_emission 
  totalCarbonSaved_lbs: 0.0,    // random number pulled from avg_daily_emission * num of days since start (make up if necessary) 
  dailyVSL_dollars: 0.0,        // from avg_daily_health_impact
  totalRegionVSL_dollars: 0.0,  // same as totalCarbonSaved
  startDate: "2026-01-01",      // user specific start date 
  region: "CAISO_NORTH",        // region set for time being
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function lbsToKg(lbs) { return (lbs * 0.453592).toFixed(1); }
function milesEquivalent(lbs) { return (lbs / 0.404).toFixed(0); }
function fmt(n, decimals = 1) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return Number(n).toFixed(decimals);
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, unit, sub, accent }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      border: `1px solid ${accent ? "var(--primary)" : "var(--border)"}`,
      borderRadius: 12,
      padding: "24px 20px",
      boxShadow: accent
        ? "0 0 0 1px var(--primary), 0 10px 24px rgba(2,6,23,0.12)"
        : "0 10px 24px rgba(2,6,23,0.12)",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}>
      <span style={{
        fontSize: 10,
        fontFamily: "Courier New, monospace",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: accent ? "var(--primary)" : "var(--muted)",
      }}>
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span className="data" style={{
          fontSize: "2.6rem",
          lineHeight: 1,
          color: accent ? "var(--primary)" : "var(--text)",
        }}>
          {value}
        </span>
        <span className="passive" style={{ fontSize: "0.8rem" }}>{unit}</span>
      </div>
      {sub && (
        <span className="passive" style={{ fontSize: "0.75rem", marginTop: 2 }}>
          {sub}
        </span>
      )}
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 0",
          gap: 16,
          textAlign: "left",
          fontFamily: "Courier New, monospace",
          fontSize: "0.92rem",
          color: open ? "var(--primary)" : "var(--text)",
          transition: "color 0.15s",
        }}
      >
        <span>{question}</span>
        <span style={{
          fontSize: "1.2rem",
          color: "var(--primary)",
          flexShrink: 0,
          lineHeight: 1,
        }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="passive" style={{
          fontSize: "0.88rem",
          lineHeight: 1.8,
          paddingBottom: 18,
          paddingRight: 28,
          margin: 0,
        }}>
          {answer}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Impact() {
  const [userData, setUserData] = useState(USER_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = "http://localhost:5000";

  const userSavings = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(backendUrl + "/user-savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });
      if (!res.ok) throw new Error("Failed to fetch user savings");
      
      const data = await res.json();
      setUserData({
        dailyCarbonSaved_lbs: data.daily_carbon || 0,
        totalCarbonSaved_lbs: data.all_carbon || 0,
        dailyVSL_dollars: data.daily_health || 0,
        totalRegionVSL_dollars: data.all_carbon || 0,
        startDate: "2026-01-01",
        region: "CAISO_NORTH",
      });
    } catch (err) {
      console.error("Error fetching user savings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // On mount, fetch data (pass empty token for now)
  useEffect(() => {
    userSavings({});
  }, []);

  const d = userData;

  const faqs = [
    {
      question: "Why does the time of day matter so much?",
      answer:
        "The electric grid isn't one big battery — it's a live balancing act between supply and demand. When demand spikes (like at 6pm when everyone gets home), utilities fire up their least efficient, most polluting plants to keep up. When renewables are overproducing midday or overnight, that surplus gets wasted unless something is drawing it down. Running a dishwasher at the right moment means you're using electricity that would otherwise go to waste.",
    },
    {
      question: "What appliances make the biggest difference?",
      answer:
        "The highest-impact shifts are clothes dryers (~3 kWh/cycle), HVAC (~15 kWh/day), and EV charging (~10 kWh/session). Dishwashers and washing machines matter too. Fridges and standby devices draw power continuously and can't be shifted — we don't count those in your savings.",
    },
    {
      question: "How accurate are these numbers?",
      answer:
        "The grid data is accurate to within 5 minutes — it comes directly from WattTime's real-time monitoring. The appliance energy figures are US national averages, so your actual savings may differ depending on your specific devices and usage patterns. Think of the numbers as reliable order-of-magnitude estimates, not precise measurements.",
    },
    {
      question: "What does the health impact dollar figure actually mean?",
      answer:
        "Fossil fuel plants emit fine particulate matter and nitrogen oxides that harm people living downwind — contributing to asthma, heart disease, and premature death. The dollar figure converts that harm using the EPA's value of a statistical life (~$11.6M), the same method used to evaluate clean air regulations. It's a comparative tool, not a literal price tag on anyone's life.",
    },
    {
      question: "Can I do anything beyond shifting appliance timing?",
      answer:
        "Yes. Reducing total consumption matters too — shorter wash cycles, full dishwasher loads, better home insulation, and heat pump upgrades all reduce your baseline. If you drive, switching to an EV and charging during clean windows compounds the benefit significantly. Rooftop solar also changes your relationship with the grid entirely.",
    },
    {
      question: "Does my individual action actually matter?",
      answer:
        "By itself, one household shifting one appliance is a small number. But grid operators make dispatch decisions based on aggregate demand signals — when enough households shift load, it changes which plants run. Programs like demand response already work on this principle at scale. Your action is one data point in a larger pattern that utilities do respond to.",
    },
  ];

  return (
      <div style={{ maxWidth: 860, margin: "40px auto", padding: "0 20px 80px" }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", padding: "48px 0 52px" }}>
          <span className="passive" style={{
            display: "inline-block",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "5px 14px",
            marginBottom: 20,
          }}>
            Your Impact · {d.region}
          </span>
          <h1 style={{
            fontFamily: "Courier New, monospace",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "var(--text)",
            margin: "0 auto 16px",
            maxWidth: 560,
          }}>
            Every kilowatt-hour has{" "}
            <span style={{ color: "var(--primary)" }}>a moment.</span>
          </h1>
          <p className="passive" style={{
            fontSize: "0.95rem",
            lineHeight: 1.75,
            maxWidth: 500,
            margin: "0 auto",
          }}>
            The grid's carbon intensity shifts every five minutes. By running heavy
            appliances during clean windows, you reduce real emissions and real harm
            to real people.
          </p>
        </div>

        {/* ── Stats ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginBottom: 64,
        }}>
          <StatCard
            accent
            label="CO₂ you saved today"
            value={fmt(d.dailyCarbonSaved_lbs)}
            unit="lbs CO₂"
            sub={`≈ ${lbsToKg(d.dailyCarbonSaved_lbs)} kg · like not driving ${milesEquivalent(d.dailyCarbonSaved_lbs)} miles`}
          />
          <StatCard
            label="Total CO₂ saved"
            value={fmt(d.totalCarbonSaved_lbs)}
            unit="lbs CO₂"
            sub={`Since ${d.startDate}`}
          />
          <StatCard
            label="Health harm avoided today"
            value={`$${fmt(d.dailyVSL_dollars, 2)}`}
            unit="VSL equiv."
            sub="Based on EPA value of a statistical life"
          />
          <StatCard
            label={`Region health impact · ${d.region}`}
            value={`$${fmt(d.totalRegionVSL_dollars)}`}
            unit="VSL equiv."
            sub="All users in your region combined today"
          />
        </div>

        {/* ── Divider ── */}
        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

        {/* ── Why it matters ── */}
        <div style={{ maxWidth: 640, margin: "0 auto 80px" }}>
          <span className="passive" style={{
            display: "block",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: 16,
          }}>
            Why this matters
          </span>
          <h2 style={{
            fontFamily: "Courier New, monospace",
            fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
            fontWeight: 700,
            color: "var(--text)",
            lineHeight: 1.3,
            marginBottom: 24,
          }}>
            The grid isn't always the same grid.
          </h2>
          <div className="passive" style={{ fontSize: "0.93rem", lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>
              At any given moment, electricity on your local grid comes from a mix of sources — solar,
              wind, natural gas, coal, nuclear. The exact mix changes every five minutes based on
              weather, time of day, and demand.{" "}
              <span style={{ color: "var(--text)", fontWeight: 700 }}>
                When you plug something in, you're pulling from whatever is running right now.
              </span>
            </p>
            <p style={{ marginBottom: 16 }}>
              During peak hours, utilities fire up their least efficient, most polluting "peaker" plants
              to meet demand. During sunny or windy periods, renewables can overproduce — and that
              surplus gets wasted unless something draws it down. Running your dryer at 2am instead of
              6pm can mean{" "}
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>zero marginal emissions</span>
              {" "}— your appliance running entirely on energy that would otherwise be curtailed.
            </p>
            <p style={{ margin: 0 }}>
              The health impact number captures something CO₂ alone doesn't. Fossil plants also emit
              fine particulate matter and nitrogen oxides — pollutants that stay low and reach
              communities near power plants.{" "}
              <span style={{ color: "var(--text)", fontWeight: 700 }}>
                Shifting load away from those plants means fewer pollutants reaching fewer lungs.
              </span>
              {" "}The dollar figure makes that harm comparable across time and place, using the same
              methodology the EPA applies to clean air regulation.
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

        {/* ── FAQ ── */}
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <span className="passive" style={{
            display: "block",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: 16,
          }}>
            Common questions
          </span>
          <h2 style={{
            fontFamily: "Courier New, monospace",
            fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
            fontWeight: 700,
            color: "var(--text)",
            lineHeight: 1.3,
            marginBottom: 36,
          }}>
            How to do more.
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* ── Footer note ── */}
        <p className="passive" style={{
          textAlign: "center",
          fontSize: "0.75rem",
          marginTop: 64,
          lineHeight: 1.7,
        }}>
          Grid emissions data provided by{" "}
          <a href="https://watttime.org" target="_blank" rel="noreferrer"
            style={{ color: "var(--primary)", textDecoration: "underline", textUnderlineOffset: 3 }}>
            WattTime
          </a>.
          {" "}Health damage figures use EPA VSL methodology. Appliance figures are US national averages.
        </p>

      </div>
    );
  }
