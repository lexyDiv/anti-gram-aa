/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const {
  User, Midi_chat, Chat, Contact,
} = require('../../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const users = await User.findAll();
      res.json({ message: 'connect, connect', users });
    } catch (error) {
      res.json({ message: error.message });
    }
  });

module.exports = router;