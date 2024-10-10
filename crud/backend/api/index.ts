import dotenv from 'dotenv';
import '../src/main'
dotenv.config();

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel running"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

