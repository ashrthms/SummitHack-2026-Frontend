import { useEffect, useState } from "react";
import "./styles.css"

const backendUrl = "http://localhost:5000";

export function useToken() {
  const [token, setTokenState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load token from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setTokenState(savedToken);
        console.log("Token loaded from localStorage");
      }
    } catch (err) {
      console.log("Error reading localStorage:", err);
    }
  }, []);

  // Fetch a new token from backend
  const getToken = async (info) => {
    console.log("Fetching new token with info:", info);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(backendUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }).catch(error => {
          setError(error)
          console.log("error: ", error);
      });
      const data = await res.json();
      setError(data.error);
      return data.token || null;
    } catch (err) {
      console.log("Error fetching token: ", err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch token and store it
  const populateToken = async (info) => {
    // console.log("Fetching token with: ", info)
    let newToken;
    setLoading(true);
    setError(null);
    try {
        const res = await fetch(backendUrl + "/create-user", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(info),

        }).catch(error => {
            setError(error);
            console.log("error: ", error);
        });
        const data = await res.json();
        newToken = data.token || null
        setError(data.error);
    } catch (err) {
        console.log("Error fetching token: ", err);
        setError(err);
    } finally {
        setLoading(false);
    }

    if (newToken) {
      setTokenState(newToken);
      try {
        localStorage.setItem("token", newToken);
      } catch (err) {
        console.log("Error saving to localStorage:", err);
      }
      return newToken;
    }
    return null;
  };

  // Clear token
  const clearToken = () => {
    setTokenState("");
    try {
      localStorage.removeItem("token");
    } catch (err) {
      console.log("Error clearing localStorage:", err);
    }
  };

  return { token, loading, error, getToken, populateToken, clearToken };
}
