
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
 

const jwt = require('jsonwebtoken');
const SECRET= process.env.JWT_SECRET;









const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth"); 
app.use("/api/auth", authRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

