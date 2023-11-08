const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 30 * 1000,
    httpOnly: true,
  },
};

module.exports = sessionConfig;
