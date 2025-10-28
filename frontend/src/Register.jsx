import React, { useState, useEffect } from "react";
import "../public/Register.css"; 


export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [sex, setSex] = useState(""); 
  const [age, setAge] = useState("");
  const [poit, setPoit]  = useState("");
  const [longeur, setLongeur]  = useState("");
  const [bloodpress, setBloodpress]  = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          
          firstname:firstname,
          lastname:lastname,
          email:email,
          phonenumber:phonenumber,
          sex:sex,
          age:age,
          poit:poit,
          longeur:longeur,
          bloodpress:bloodpress,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Registration failed");
        return;
      }

     
      if (data?.token) localStorage.setItem("token", data.token);
      alert("Done");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

     useEffect(() => {
      document.body.classList.add("home-bgg");
      return () => document.body.classList.remove("home-bg");
    }, []);

  return (
    <>
      
      
       
      <div className="container">
        <div className="card">
          <div className="header">
            <h1>Create Account</h1>
            <p className="subtitle">Register to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>firstname</label>
              <input
                type="text"
                placeholder="janna Test"
                name="firstname"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>lastname</label>
              <input
                type="lastname"
                placeholder="janna Test"
                
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label >email</label>
              <input
                type="email"
                placeholder="jihedjmm@gmail.com"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>phonenumber</label>
           <input
  type="number"
  placeholder="Enter phone number"
  value={phonenumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  required
/>
            </div>

            <div className="form-group">
              <label>sex</label>
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
              </select>
              
            </div>

            <div className="form-group">
              <label>age</label>
              <input
                type="number"
                
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>poit</label>
              <input
                type="number-kg"
                
                value={poit}
                onChange={(e) => setPoit(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>longeur</label>
              <input
                type="number-cm"
                
                value={longeur}
                onChange={(e) => setLongeur(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>bloodpress</label>
              <input
                type="number"
               
                value={bloodpress}
                onChange={(e) => setBloodpress(e.target.value)}
                required
              />
            </div>

            <button className="btn" type="submit">Register</button>

            <p className="footnote">
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

