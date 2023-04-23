const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../utils/token');
const jwt = require('jsonwebtoken');

// @desc  Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('Password is required');
  }

  // Check if user already exists.
  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Generate a salt value for hashing the password.
  const salt = await bcrypt.genSalt(10);

  if (!salt) {
    res.status(500);
    throw new Error('Error generating salt');
  }

  // Hash password before saving to database using the generated salt.
  const hashedPassword = await bcrypt.hash(password, salt);

  user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc  Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // Compare password with hashed password in database.
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30d' }
    );

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      accessToken, // add accessToken to the response
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc  Current user information
// @route POST /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
