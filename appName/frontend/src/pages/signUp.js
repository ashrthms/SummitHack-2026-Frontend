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
    // console.log(name,password,email,region);
    populateToken({
      "email": email,
      "name": name,
      "password": password,
      "region": region
    })
  };

  const loginInfoGather = (<>
    <div className="miniCard">
      <label>Email:</label>
      <input type="text"
        id="email"
        email="e"
        required
        minLength="4"
        maxLength="16"
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
        maxLength="16"
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
        maxLength="16"
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
        maxLength="16"
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
        maxLength="16"
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
        maxLength="16"
        size="10em"
        placeholder="Address">
          <option value = "CAISO_NORTH">Northern California</option>
          <option value = "haha">Seattle</option>
          <option value = "nope">Los Angeles</option>
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
      </div>
  </>)
}
