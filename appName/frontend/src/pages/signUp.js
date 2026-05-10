import { useState } from "react";
import { useToken } from "../token";


export default function SignUp() {
  const { token, loading, error, getToken, populateToken, clearToken} = useToken();
  const [message, setMessage] = useState(null);
  const [newAccount, setNewAccount] = useState(token ? false : true);
  const toggleNewAccount = () => setNewAccount(newAccount => !newAccount);
  const backendUrl = "http://localhost:5000";

  const handleLogin = () => {
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    getToken({
      "email": email,
      "password": password
    })
  };
  const handleSignUp = () => {
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const region = document.getElementById('region').value;
    const email = document.getElementById('email').value;
    console.log(name,password,email,region);
    populateToken({
      "email": email,
      "name": name,
      "password": password,
      "region": region
    })
    {console.log("error: ", error)}
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
        id="email"
        email="e"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Email" />
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
      {error && <p style={{ color: "red" }}>{error.error}</p>}

    </>
  </>)
  const signUpInfoGather = (<>
    <>
      <input type="text"
        id="name"
        name="u"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Name" />
    </>
    <>
      <input type="text"
        id="email"
        name="a"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Email" />
    </>
    <>
      <input type="text"
        id="password"
        name="p"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Password" />
    </>
    <>
      <label>Choose a Region:</label>
      <select
        id="region"
        name="a"
        required
        minLength="4"
        maxLength="16"
        size="10em"
        placeholder="Address">
          <option value = "CAISO_NORTH">Northern California</option>
          <option value = "haha">Seattle</option>
          <option value = "nope">Los Angeles</option>
        </select>
    </>
    <>

    </>
    <>
      <button onClick={handleSignUp}>
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
