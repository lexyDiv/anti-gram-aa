/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const ssr = require('../../middleware/ssr');
const sessionConfig = require('../sessionConfig/sessionConfig');
require('dotenv').config();

const serverConfig = (app) => {
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));
  app.use(fileUpload());
  app.use(ssr);
  app.use(cookieParser());
  app.use(session(sessionConfig));
};

module.exports = serverConfig;
