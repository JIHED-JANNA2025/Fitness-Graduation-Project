import React, { useEffect, useState } from 'react';
import './styles/advacis.css';

function Advacis() {
  const [advacis, setAdvacis] = useState([]);
  const [form, setForm] = useState({
    typefood: "",
    typeexercise: "",
    duree: "",
    but: "",
  });

  useEffect(() => {
    const fetchAdvices = async () => {
      const res = await fetch("http://localhost:5000/api/auth/advacis", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setAdvacis(data);
    };
    fetchAdvices();
  }, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/advacis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setAdvacis((prev) => [...prev, data]);
      alert("Advices enregistré!");
      setForm({ typefood: "", typeexercise: "", duree: "", but: "" });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (

   <>
    <link rel="stylesheet" href="/advacis.css" />

     <div className='container'>
      <div className='card'>
        <div className="header">
            <h1>Fitness Advice</h1>
            <p>save your preferences for personallized advice</p>
          </div>

    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={form.typefood}
          onChange={(e) => setForm({ ...form, typefood: e.target.value })}
          placeholder="Type de nourriture"
        />
        <input
          value={form.typeexercise}
          onChange={(e) => setForm({ ...form, typeexercise: e.target.value })}
          placeholder="Type d'exercice"
        />
        <input
          value={form.duree}
          onChange={(e) => setForm({ ...form, duree: e.target.value })}
          placeholder="Durée"
        />
        <input
          value={form.but}
          onChange={(e) => setForm({ ...form, but: e.target.value })}
          placeholder="But"
        />
        <button type="submit">Enregistrer</button>
      </form>
      <ul>
        {advacis.map((a, i) => (
          <li key={i}>
            {a.typefood} - {a.typeexercise} - {a.duree} - {a.but}
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
    </>
  );
}

export default Advacis;