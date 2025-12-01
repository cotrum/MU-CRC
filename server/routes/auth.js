import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "All fields are required." });

    // Does the email already exist?
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ msg: "Email already registered." });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role,
    });

    return res.status(201).json({ msg: "User created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error." });
  }
});

/* 
----------------------
 LOGIN
---------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password are required." });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ msg: "Invalid credentials." });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ msg: "Invalid credentials." });


    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined!");
      return res.status(500).json({ msg: "Server misconfiguration." });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Successful login response
    res.json({
      msg: "Login successful.",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error." });
  }
});

export default router;
