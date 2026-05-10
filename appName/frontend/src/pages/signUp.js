import { useState } from "react";
import { useToken } from "../token";


export default function SignUp() {
  const { token, loading, error, populateToken } = useToken();
  const [message, setMessage] = useState(null);
  const [newAccount, setNewAccount] = useState(token ? false : true);
  const toggleNewAccount = () => setNewAccount(newAccount => !newAccount);
  const backendUrl = "http://localhost:5000";

  const handleLogin = () => {
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    populateToken({
      "username": username,
      "password": password
    })
  };
  const handleSignUpLogin = () => {
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    populateToken({
      "username": username,
      "password": password
    })
  };

  async function getCoords(address) {
    const url = `https://openstreetmap.org{encodeURIComponent(address)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.length > 0) {
      console.log(`Lat: ${data[0].lat}, Lon: ${data[0].lon}`);
    } else {
      console.log("No results found");
    }
  }



  const loginInfoGather = (<>
    <h1>Log In</h1>
    <>
      <input type="text"
        id="username"
        name="u"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Username" />
    </>
    <>
      <input type="text"
        id="password"
        name="p"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Pasword" />
    </>
    <>
      <button onClick={handleLogin}>
        Log In
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error.message || String(error)}</p>}

    </>
  </>)
  const signUpInfoGather = (<>
    <>
      <input type="text"
        id="username"
        name="u"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Username" />
    </>
    <>
      <input type="text"
        id="password"
        name="p"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Pasword" />
    </>
    <>
      <input type="text"
        id="adr"
        name="a"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Address" />
    </>
    <>

    </>
    <>
      <button onClick={handleLogin}>
        Sign Up
      </button>
      {loading && <p>Loading...</p>}  
      {error && <p style={{ color: "red" }}>{error.message || String(error)}</p>}

    </>
  </>)

  return (<>
      <div className="card">
        {newAccount ? "Log In" : "Sign Up"}
        {newAccount ? loginInfoGather : signUpInfoGather}
        <hr />
        <button onClick={toggleNewAccount}>{newAccount ? "Sign Up" : "Log In"}</button>
      </div>
  </>)
}