import { useState } from "react";
import { useToken } from "../token";
import img from "../image.png";


export default function SignUp() {
  const { token, loading, error, getToken, populateToken, clearToken } = useToken();
  const [message, setMessage] = useState(null);
  const [newAccount, setNewAccount] = useState(token ? false : true);
  const [success, setSuccess] = useState(false)
  const toggleNewAccount = () => setNewAccount(newAccount => !newAccount);
  const backendUrl = "http://localhost:5000";

  const handleLogin = async () => {
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    setSuccess(await getToken({
      "email": email,
      "password": password
    }))
  };
  const handleSignUp = async () => {
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const region = document.getElementById('region').value;
    const email = document.getElementById('email').value;
    // console.log(name,password,email,region);
    setSuccess(await populateToken({
      "email": email,
      "name": name,
      "password": password,
      "region": region
    }))
  };

  const handleEmailClick = async () => {
    try {
      const res = await fetch("http://localhost:5000/email", {
        method: "GET",
      });
      console.log("Response status:", res.status);
    } catch (error) {
      console.error("Email request failed:", error);
    }
  };

  const loginInfoGather = (<>
    <div className="miniCard">
      <label>Email:</label>
      <input type="text"
        id="email"
        email="e"
        required
        minLength="4"
        maxLength="40"
        size="100em"
        placeholder="Email" />
    </div>
    <div className="miniCard">
      <label>Password:</label>
      <input type="text"
        id="password"
        name="p"
        required
        minLength="4"
        maxLength="40"
        size="10em"
        placeholder="Password" />
    </div>
    <>
      <button onClick={handleLogin}>
        Log In
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

    </>
  </>)
  const signUpInfoGather = (<>
    <div className="card">
      <label>Email:</label>
      <input type="text"
        id="email"
        name="a"
        required
        minLength="4"
        maxLength="40"
        size="10em"
        placeholder="Email" />
    </div>
    <div className="card">
      <label>Password:</label>
      <input type="text"
        id="password"
        name="p"
        required
        minLength="4"
        maxLength="40"
        size="10em"
        placeholder="Password" />
    </div>
    <div className="card">
      <label>Name:</label>
      <input type="text"
        id="name"
        name="u"
        required
        minLength="4"
        maxLength="40"
        size="10em"
        placeholder="Name" />
    </div>
    <div className="card">
      <label>Choose a Region:</label>
      <select
        id="region"
        name="a"
        required
        minLength="4"
        maxLength="40"
        size="10em"
        placeholder="Address">
        <option value="CAISO_NORTH">Northern California</option>
        <option value="haha">Seattle</option>
        <option value="nope">Los Angeles</option>
      </select>
    </div>
    <>

    </>
    <>
      <button onClick={handleSignUp}>
        Sign Up
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

    </>
  </>)

  return (<>
    <div className="card">
      <h1>{newAccount ? "Log In" : "Sign Up"}</h1>
      {newAccount ? loginInfoGather : signUpInfoGather}
      <hr />
      <button onClick={toggleNewAccount} className="secondaryButton">{newAccount ? "Sign Up" : "Log In"}</button>
    </div>{success &&
    <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
      <img
        src={img}
        alt="Email link"
        onClick={handleEmailClick}
        style={{ maxWidth: "160px", cursor: "pointer" }}
      />
    </div>}
  </>)
}
