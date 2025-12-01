import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

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
    });

    return res.status(201).json({ msg: "User created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error." });
  }
});

export default router;
