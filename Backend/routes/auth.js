const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

//signup route to create a new user in the database and hash the password before saving it 
router.post('/signup', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, mobile, password });
    await user.save(); //  pre('save') will hash the password

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});




//Login route to authenticate the user and generate a token for the user 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare Hashed Password with entered password 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //  Generate Token for the user 
    const token = jwt.sign(
      { id: user._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
