const express = require('express');
const pool = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { firstname,lastname, email,phonenumber, sex, age,poit, longeur, bloodpress } = req.body;

    // Validate required fields
    if (!firstname || !email || !phonenumber) {
      return res.status(400).json({ error: "firstname, email, and phonenumber are required" });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1", 
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Insert new user - FIXED: had 6 values but 7 parameters
    const result = await pool.query(
      "INSERT INTO users (firstname,lastname, email,phonenumber, sex, age, poit, longeur, bloodpress) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8,$9) RETURNING *",
      [firstname,lastname, email,phonenumber, sex, age, poit, longeur, bloodpress ]
    );

    res.status(201).json({ 
      message: "Registration successful",
      user: result.rows[0] 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, phonenumber } = req.body;
    console.log(email,phonenumber)

    // Validate input
    if (!email || !phonenumber) {
      return res.status(400).json({ error: "Email and phonenumber are required" });
    }

    // Check if user exists
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1", [email]
    );

    if (!result.rows) {
      return res.status(401).json({ error: "Invalid email or phonenumber" });
    }

    const user = result.rows[0];

    // In a real app, you should hash passwords and use bcrypt.compare()
    // For now, basic password check (replace with proper hashing)
    if (user.phonenumber != phonenumber.toString()) {
      return res.status(401).json({ error: "Invalid email or phonenumber" });
    }

    // Create JWT token
    const token = jwt.sign({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    }, secret, {
      expiresIn: "1h",
    });

    res.json({ 
      token, 
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/advacis", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM advacis");
    res.json(result.rows);
  } catch (error) {
    console.error("Advacis error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
});      

router.post("/advacis", async (req,res)=>{

const { typefood, typeexercise, duree, but} =req.body;
try{

  const result =await pool.query("INSERT INTO advacis(typefood, typeexercise, duree, but) Values($1, $2, $3, $4)",[typefood, typeexercise, duree, but ]);
   const user = result.rows[0];
    
    res.json("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;