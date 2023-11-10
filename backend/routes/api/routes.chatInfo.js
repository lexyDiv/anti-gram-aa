/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-return-assign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const router = require("express").Router();
const { Op } = require("sequelize");
const {
  Midi_chat,
} = require("../../db/models");
const usersData = require("../../app");

router.route("/:chatId").get(async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat_midis = await Midi_chat.findAll({ where: { chat_id: chatId } });
    res.json(chat_midis);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.route('/sleeping/:nickName', (req, res) => {
  const { nickName } = req.params;
  if (!usersData.usersOnline[nickName]) {
    console.log(111111111);
    res.json({ message: 'bad' });
  } else {
    console.log(22222222);
    res.json({ message: 'ok' });
  }
});

module.exports = router;
