const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const router = express.Router();

const USER = {
    username: "naval.ravikant",
    password: "05111974",
  };

router.post("/login", (req, res) => {
    
    const { username, password } = req.body;

    if (username === USER.username && password === USER.password) {
        const token = jwt.sign({username}, process.env.JWT_SECRET);
        return res.status(200).json({ JWT: token });
    }
    
    else {
        return res.status(401).json({ error: "Invalid username or password" });
    }

})

module.exports = router;