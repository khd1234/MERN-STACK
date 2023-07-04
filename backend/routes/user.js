const express = require("express");

const {  loginUser, singupUser } = require("../controllers/userController")

const router = express.Router();

// Login route
router.post("/login", loginUser)

// Signup route
router.post("/signup", singupUser)

module.exports = router;
