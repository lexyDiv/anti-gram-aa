const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateRefrashToken = (refrashToken) => {
  try {
    const userData = jwt.verify(refrashToken, process.env.JWT_SECRET_REFRESH);
    return userData;
  } catch (err) {
    return null;
  }
};

module.exports = validateRefrashToken;
