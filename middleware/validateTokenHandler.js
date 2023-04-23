const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Invalid authorization header format');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      throw new Error('Invalid token: user not found');
    }

    // Attach the user object to the request object for later use
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Invalid token: token could not be verified');
  }
});

module.exports = validateToken;
