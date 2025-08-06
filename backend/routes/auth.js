const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'secret123';

// ROUTE 1: Create a user
router.post('/createuser', async (req, res) => {
  let success = false;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = { user: { id: user.id } };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.status(201).json({ success, authtoken, name: user.name });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ROUTE 2: Authenticate a user
router.post('/login', async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: 'Invalid credentials' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: 'Invalid credentials' });
    }

    const data = { user: { id: user.id } };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken, name: user.name });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ROUTE 3: Get logged in user details
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
