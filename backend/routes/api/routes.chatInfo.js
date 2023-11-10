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

module.exports = router;
