import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import SignUp from "./pages/signUp";
import ImpactCalculator from "./pages/impactCalculator";
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to= "/">Home</Link>
        <Link to= "/about">About Us</Link>
        <Link to= "/sign-up">Sign Up</Link>
        <Link to= "/impact-calculator">Impact Calculator</Link>
      </div>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path= "/sign-up" element={<SignUp />}>Sign Up</Route>
          <Route path= "/impact-calculator" element={<ImpactCalculator />}>Impact Calculator</Route>
      </Routes>
      
    </BrowserRouter>
  )
}
