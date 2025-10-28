import React, { useState,useEffect } from "react";
import "../public/Login.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [phonenumber,setPhoneNumber]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({email,}))
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email,phonenumber }),
    });
    if (!res.ok) {
      alert("login failed");
      return;
    } 

    const data = await res.json();
    console.log("Login result:", data);
     
    alert("login successful");
    location.href="/advacis";
  };
  
   useEffect(() => {
    document.body.classList.add("home-bg");
    return () => document.body.classList.remove("home-bg");
  }, []);
  return (
    
    <div className="container">
       <link rel="stylesheet" href="/register.css" />
      <div className="card">
        <div className="header">
          
           
          <h1>Sign In</h1>
          <p className="subtitle">Enter your email to sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="tel">phonenumber</label>
            <input
              id="phonenumber"
              name="phonenumber"
              type="tel"
              placeholder="Enter your phone number"
              required
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <div className="footer">
          <p>
            Don't have an account? <a href="/">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}


