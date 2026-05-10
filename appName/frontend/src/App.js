import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import SignUp from "./pages/signUp";
import ImpactCalculator from "./pages/impactCalculator";
import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(false)
  const backendUrl = "http://localhost:5000";

  const [theme, setTheme] = useState(() => {
    //Log In / Sign Up
    console.log("clicked");
    try {
      return localStorage.getItem("theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    } catch (e) {
      console.log(e);
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }, [theme]);





  return (
    <BrowserRouter>
      <nav>
        <Link to="/" >Home</Link>
        <Link to="/about" >About Us</Link>
        <Link to="/sign-up" >Sign Up</Link>
        <Link to="/impact-calculator" >Impact Calculator</Link>
        <div className="spacer" />
        <button className="theme-toggle" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/impact-calculator" element={<ImpactCalculator />} />
      </Routes>

    </BrowserRouter>
  );
}