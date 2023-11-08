/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-return-assign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const router = require("express").Router();
const { Op } = require("sequelize");
const {
  User,
  Chat,
  Message,
  Like,
  Dislike,
  Midi_message,
  Viewed,
  Sequelize,
} = require("../../db/models");

router.route("/:chatId/:stepsPlan/:messageId/:id").get(async (req, res) => {
  try {
    const {
      chatId, stepsPlan: stepsArr, messageId, id,
    } = req.params;
    const stepsPlan = stepsArr.split(",");
    const chat = await Chat.findOne({
      where: { id: chatId },
      include: { model: Message },
    });
    const step = 50;
    const indexMessage = chat.Messages.sort((a, b) => a.id - b.id).findIndex(
      (el) => el.id === +messageId,
    );

    let offset = 0;

    for (let i = 0; i < stepsPlan.length; i += 1) {
      const stepsArrElem = stepsPlan[i];
      if (indexMessage >= offset && indexMessage < offset + step) {
        const limit = Number(stepsArrElem);
        const forvard = stepsPlan.length - i;

        const messages = await Message.findAll({
          where: { chat_id: chatId },
          offset,
          limit,
          include: [
            {
              model: Viewed,
              where: { user_id: Number(id) },
              required: false,
            },
            {
              model: Like,
            },
            {
              model: Dislike,
            },
            {
              model: Midi_message,
            },
            {
              model: User,
            },
          ],
          order: Sequelize.col("id"),
        });
        res.json({ messages, chatId, forvard });
        return;
      }
      offset += +stepsArrElem;
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
