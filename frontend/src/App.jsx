
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import "./App.css";
import Advacis from "./Advacis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/advacis" element={<Advacis />} />
      </Routes>
    </Router>
  );
}

export default App;