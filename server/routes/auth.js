const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const JWT_SERCET = process.env.JWT_SERCET || "your-secret-key";

router.post("/register", async);
