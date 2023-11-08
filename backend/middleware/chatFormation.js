/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-return-assign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */

const { Op } = require("sequelize");
const {
  User,
  Chat,
  Midi_chat,
  Message,
  Like,
  Dislike,
  Midi_message,
  Viewed,
  Sequelize,
} = require("../db/models");

async function chatFormation(chat, userId) {
  let step = 50;
  const num = await Message.count({
    where: {
      chat_id: {
        [Op.eq]: chat.id,
      },
    },
  });
  if (num - step < 0) {
    step = num;
  }

  let offset = num - step;
  let limit = step;
  if (num < step * 2) {
    offset = 0;
    limit = num;
  }
  const messages = await Message.findAll({
    where: { chat_id: chat.id },
    offset,
    limit,
    include: [
      {
        model: Viewed,
        where: { user_id: userId },
        required: false,
      },
      {
        model: Like,
        include: { model: User, attributes: ["nickName", "foto", "id"] },
      },
      {
        model: Dislike,
        include: { model: User },
      },
      {
        model: User,
      },
    ],
    order: Sequelize.col("id"),
  });
  const messageValid = [];
  for (let k = 0; k < messages.length; k++) {
    const message = messages[k];
    let seengs = 0;
    message.User.password = 0;
    if (message.user_id === userId) {
      seengs = await Viewed.count({
        where: {
          message_id: {
            [Op.eq]: message.id,
          },
        },
      });
    }
    const aboutMessage = message.midi_massage_id
      && (await Message.findOne({
        where: { id: message.midi_massage_id },
        include: { model: User, attributes: ["id", "nickName", "foto"] },
      }));
    messageValid.push({
      Dislikes: message.Dislikes,
      Likes: message.Likes,
      Midi_messages: message.Midi_messages,
      User: message.User,
      Vieweds: message.Vieweds,
      body: message.body,
      chat_id: message.chat_id,
      emojiId: message.emojiId,
      id: message.id,
      image: message.image,
      midi_message_id: message.midi_massage_id,
      date: message.date,
      user_id: message.user_id,
      seengs,
      aboutMessage,
    });
  }
  return { messageValid, num };
}

module.exports = chatFormation;
