const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenAge = 60 * 30;
const refrashTokenAge = 60 * 60 * 24 * 30 * 1000;

const getTokens = (login, userId) => {
  const accessToken = jwt.sign({ login, userId }, process.env.JWT_SECRET_ACCESS, {
    expiresIn: `${accessTokenAge}s`,
  });
  const refrashToken = jwt.sign({ login, userId }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: `${refrashTokenAge}s`,
  });
  return { accessToken, refrashToken };
};

module.exports = getTokens;
