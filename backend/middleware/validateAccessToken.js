const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateAccessToken = (accessToken) => {
  try {
    const userData = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS);
    return userData;
  } catch (err) {
    return null;
  }
};

module.exports = validateAccessToken;
