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
  Midi_chat,
  Message,
  Like,
  Dislike,
  Midi_message,
  Viewed,
  Sequelize,
} = require("../../db/models");
const chatFormation = require("../../middleware/chatFormation");

router.route("/get/allChats/:chatName").get(async (req, res) => {
  try {
    const { chatName } = req.params;
    const chats = await Chat.findAll({ where: { type: "all" } });
    const validChats = chats.filter(
      (chat) => chat.name.slice(0, chatName.length).toLowerCase()
        === chatName.toLowerCase(),
    );
    const chatsValid = [];
    for (let i = 0; i < validChats.length; i++) {
      const chat = validChats[i];
      const num = await Midi_chat.count({
        where: {
          chat_id: {
            [Op.eq]: chat.id,
          },
        },
      });
      chatsValid.push({
        id: chat.id,
        name: chat.name,
        type: chat.type,
        status: chat.status,
        foto: chat.foto,
        allUsers: num,
      });
    }
    res.json(chatsValid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.route("/:userId").get(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id", "nickName"],
    });
    const midiChats = await Midi_chat.findAll({
      where: { user_id: userId },
      include: {
        model: Chat,
      },
    });
    const chatsData = [];

    for (let i = 0; i < midiChats.length; i++) {
      const chat = midiChats[i].Chat;
      const hz = await chatFormation(chat, userId);

      let alien;

      if (chat.type === "personal") {
        const alienName = chat.users
          .split("+")
          .find((nickName) => nickName !== user.nickName);

        alien = await User.findOne({
          where: { nickName: alienName },
          attributes: ["id", "nickName", "foto"],
        });
      }

      chatsData.push({
        id: chat.id,
        status: chat.status,
        creator_id: chat.creator_id,
        foto: chat.foto,
        users: chat.users,
        name: chat.name,
        messages: hz.messageValid,
        forvard: 1,
        type: chat.type,
        oldMessages: [],
        allMessages: hz.num,
        scrollTop: -1,
        click: false,
        alien,
        scrollFocusMessageId: 0,
        stepsPlan: [],
        online: false,
      });
    }
    res.json({ message: "ok", chats: chatsData });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.route("/:limit/:offset/:chatId/:userId").get(async (req, res) => {
  try {
    const {
      limit, offset, chatId, userId,
    } = req.params;

    const messages = await Message.findAll({
      where: { chat_id: chatId },
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
          include: { model: User, attributes: ["id", "foto", "nickName"] },
        },
        {
          model: Dislike,
          include: { model: User, attributes: ["id", "foto", "nickName"] },
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
    const messagesValid = [];
    for (let i = 0; i < messages.length; i += 1) {
      const message = messages[i];
      let seengs = 0;
      if (message.user_id !== userId) {
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
      messagesValid.push({
        Dislikes: message.Dislikes,
        Likes: message.Likes,
        Midi_messages: message.Midi_messages,
        User: message.User,
        midi_message: await Midi_message.findOne({
          where: { id: message.midi_massage_id },
        }),
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
    res.json({ message: "ok", messages: messagesValid });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
