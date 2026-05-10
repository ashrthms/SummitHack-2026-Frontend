import { useState } from "react";

export default function SignUp() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendUrl = "http://localhost:5000";

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

  return (<div>Sign Up</div>)}