/* eslint-disable no-await-in-loop */
/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
require("@babel/register");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { Op } = require("sequelize");

const path = require("path");
const serverConfig = require("./config/serverConfig/serverConfig");
const apiRouterPers = require("./routes/api/routes.personalisation");
const apiRouterChats = require("./routes/api/reutes.chats");
const apiRouterChatsAbout = require("./routes/api/routes.chatsAbout");
const apiRouterChatInfo = require("./routes/api/routes.chatInfo");
require("dotenv").config();

const {
  User,
  Chat,
  Midi_chat,
  Message,
  Like,
  Dislike,
  Midi_message,
  Viewed,
  Contact,
} = require("./db/models");
const chatFormation = require("./middleware/chatFormation");

const app = express();
const httpServer = http.createServer(app);
const io = new socketIO.Server(httpServer);

const usersData = { usersOnline: {}, socketsId: {} };

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    const { chatId } = data;
    socket.join(chatId);
  });

  socket.on("user/join", (data) => {
    const { userNick, userId, contacts } = data;
    socket.join(userNick);
    if (!usersData.usersOnline[userNick]) {
      usersData.usersOnline[userNick] = {
        userId,
        contacts,
        socketsId: [socket.id],
      };
    } else {
      usersData.usersOnline[userNick].socketsId.push(socket.id);
    }

    contacts.forEach((contact) => {
      if (usersData.usersOnline[contact]) {
        io.to(userNick).emit("online", { alienNickName: contact });
      }
      io.to(contact).emit("online", { alienNickName: userNick });
    });
    usersData.socketsId[socket.id] = data.userNick;
  });
  socket.on("disconnecting", () => {
    const userNickName = usersData.socketsId[socket.id];
    if (userNickName) {
      delete usersData.socketsId[socket.id];
      const user = usersData.usersOnline[userNickName];
      if (user) {
        user.socketsId.splice(user.socketsId.indexOf(socket.id), 1);
        if (!user.socketsId.length) {
          user.contacts.forEach((contact) => {
            io.to(contact).emit("offline", { alienNickName: userNickName });
          });
          delete usersData.usersOnline[userNickName];
        }
      }
    }
  });

  socket.on('get:chats', async (data) => {
    const { userId, userNickName } = data;
    try {
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

      for (let i = 0; i < midiChats.length; i += 1) {
        const chat = midiChats[i].Chat;
        socket.join(String(chat.id));
        const hz = await chatFormation(chat, userId);

        let alien;
        let online = false;

        if (chat.type === "personal") {
          const alienName = chat.users
            .split("+")
            .find((nickName) => nickName !== user.nickName);

          alien = await User.findOne({
            where: { nickName: alienName },
            attributes: ["id", "nickName", "foto"],
          });
          if (alien && usersData.usersOnline[alien.nickName]) {
            online = true;
          }
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
          online,
        });
      }
      io.to(user.nickName).emit('get:chats', { message: 'ok', chatsData });
    } catch (err) {
      io.to(userNickName).emit('get:chats', { message: 'bad' });
      console.log(err.message);
    }
  });

  socket.on("new:all:chat", async (data) => {
    try {
      const { name, foto, password, userId, nickName } = data;
      const date = Date().split(" ");
      const chat = await Chat.create({
        type: "all",
        status: password,
        name,
        foto,
        users: "",
        user_delete: false,
        date: JSON.stringify({
          year: date[3],
          day: date[2],
          month: date[1],
          time: date[4],
        }),
      });
      const hz = await chatFormation(chat, userId);
      const chatData = {
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
        scrollFocusMessageId: 0,
        stepsPlan: [],
        online: false,
      };
      await Midi_chat.create({ user_id: userId, chat_id: chatData.id });
      io.to(nickName).emit("new:all:chat", chatData);
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("add:chat:all", async (data) => {
    try {
      const { chatId, userId, userNickName } = data;
      await Midi_chat.create({ chat_id: chatId, user_id: userId });
      const chat = await Chat.findOne({ where: { id: chatId } });

      const hz = await chatFormation(chat, userId);
      const chatData = {
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
        scrollFocusMessageId: 0,
        stepsPlan: [],
        online: false,
      };

      io.to(userNickName).emit("add:chat:all", chatData);
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("delete/chat", async (data) => {
    const { chatId, userId, userNickName } = data;
    try {
      await Midi_chat.destroy({ where: { chat_id: chatId, user_id: userId } });
      const midi_chats = await Midi_chat.findAll({
        where: { chat_id: chatId },
      });
      if (!midi_chats.length) {
        await Chat.destroy({ where: { id: chatId } });
      }
      io.to(userNickName).emit("delete/chat", { message: "ok", chatId });
    } catch (err) {
      io.to(userNickName).emit("delete/chat", { message: "no" });
      console.log(err.message);
    }
  });

  socket.on("check/online/req", (data) => {
    console.log(data);
  });

  socket.on("destroy", async () => {
    const messages = await Message.findAll({ where: { chat_id: 1 } });
    messages.forEach((message) => message.destroy());
  });

  socket.on("add/response", async (data) => {
    try {
      const { userId, body, emojiId, chatId, image, messageId } = data;
      const date = Date().split(" ");
      const messageData = await Message.create({
        user_id: userId,
        body,
        emojiId,
        chat_id: chatId,
        image,
        midi_massage_id: messageId,
        date: JSON.stringify({
          year: date[3],
          day: date[2],
          month: date[1],
          time: date[4],
        }),
      });
      const message = await Message.findOne({
        where: { id: messageData.id },
        include: [
          {
            model: Viewed,
            where: { user_id: userId },
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
            attributes: ["id", "nickName", "foto"],
          },
        ],
      });
      const aboutMessage = await Message.findOne({
        where: { id: messageId },
        include: { model: User, attributes: ["id", "nickName", "foto"] },
      });
      io.to(String(chatId)).emit("chat:incoming", {
        message: {
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
          seengs: 0,
          aboutMessage,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("message/delete", async (data) => {
    try {
      const { messageId, chatId, userId, forvard, stepsPlan } = data;

      await Message.destroy({ where: { id: messageId } });
      await Like.destroy({ where: { message_id: messageId } });
      await Dislike.destroy({ where: { message_id: messageId } });

      io.to(String(chatId)).emit("message/delete", {
        chatId,
        messageId,
        forvard,
        stepsPlan,
      });
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("add/personal/chat", async (data) => {
    try {
      const { userId, alienId, users, userNickName, alienNickName } = data;
      let chat = await Chat.findOne({ where: { users } });
      let online = false;
      if (!chat) {
        chat = await Chat.create({
          creator_id: userId,
          type: "personal",
          foto: "",
          users,
          status: "",
          name: "",
        });
        const userContact = await Contact.create({
          user_id: userId,
          alienNickName,
          chat_id: chat.id,
        });
        const alienContact = await Contact.create({
          user_id: alienId,
          alienNickName: userNickName,
          chat_id: chat.id,
        });
        const userOnline = usersData.usersOnline[userNickName];
        if (userOnline && userOnline.contacts.indexOf(alienNickName) === -1) {
          usersData.usersOnline[userNickName].contacts.push(alienNickName);
        }
        io.to(userNickName).emit("contact", userContact);
        io.to(alienNickName).emit("contact", alienContact);
      }

      if (usersData.usersOnline[alienNickName]) {
        online = true;
      }

      const hz = await chatFormation(chat, userId);

      const chatDataUser = {
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
        alien: await User.findOne({ where: { id: alienId } }),
        scrollFocusMessageId: 0,
        stepsPlan: [],
        online,
      };

      await Midi_chat.create({ user_id: userId, chat_id: chat.id });

      io.to(userNickName).emit("add/personal/chat", {
        chat: chatDataUser,
        forvard: true,
      });
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("put/message", async (data) => {
    try {
      const { messageId, chatId, body, image, emojiId } = data;
      const message = await Message.findOne({ where: { id: messageId } });
      message.body = body;
      message.image = image;
      message.emojiId = emojiId;
      await message.save();
      io.to(String(chatId)).emit("put/message", message);
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("chat:viewed", async (data) => {
    const { messageId, chatId, userId, userNick } = data;
    try {
      const oldViewed = await Viewed.findOne({
        where: { message_id: messageId, user_id: userId },
      });
      if (oldViewed) {
        return;
      }
      const viewed = await Viewed.create({
        user_id: userId,
        message_id: messageId,
      });
      io.to(String(userNick)).emit("chat:addViewed", { viewed, chatId });
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("click:like", async (data) => {
    try {
      const { userId, messageId, type, chatId } = data;
      if (type === "like") {
        const oldLike = await Like.findOne({
          where: { message_id: messageId, user_id: userId },
        });
        if (oldLike) {
          return;
        }
        const date = Date().split(" ");
        const newLike = await Like.create({
          user_id: userId,
          message_id: messageId,
          date: JSON.stringify({
            year: date[3],
            day: date[2],
            month: date[1],
            time: date[4],
          }),
        });
        const like = await Like.findOne({
          where: { id: newLike.id },
          include: { model: User },
        });
        like.User.password = 0;
        io.to(String(chatId)).emit("chat:addLike", { like, chatId });
      } else {
        const oldDisLike = await Dislike.findOne({
          where: { message_id: messageId, user_id: userId },
        });
        if (oldDisLike) {
          return;
        }
        const date = Date().split(" ");
        const newDisLike = await Dislike.create({
          user_id: userId,
          message_id: messageId,
          date: JSON.stringify({
            year: date[3],
            day: date[2],
            month: date[1],
            time: date[4],
          }),
        });
        const disLike = await Dislike.findOne({
          where: { id: newDisLike.id },
          include: { model: User },
        });
        disLike.User.password = 0;
        io.to(String(chatId)).emit("chat:addDisLike", { disLike, chatId });
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("chat:outgoing", async (data) => {
    try {
      const { user_id, body, emojiId, chatId, image, alienId, alienNickName } =
        data;
      const date = Date().split(" ");

      const messageData = await Message.create({
        user_id,
        body,
        emojiId,
        chat_id: chatId,
        image,
        date: JSON.stringify({
          year: date[3],
          day: date[2],
          month: date[1],
          time: date[4],
        }),
      });

      const message = await Message.findOne({
        where: { id: messageData.id },
        include: [
          {
            model: Viewed,
            where: { user_id },
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
      });

      message.User.password = 0;
      const messagesValid = {
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
        seengs: 0,
      };

      if (alienId) {
        const alienMidi_chat = await Midi_chat.findOne({
          where: { chat_id: chatId, user_id: alienId },
        });
        if (alienMidi_chat) {
          io.to(data.chatId).emit("chat:incoming", { message: messagesValid });
        } else {
          await Midi_chat.create({ user_id: alienId, chat_id: chatId });
          const chat = await Chat.findOne({ where: { id: chatId } });
          const hz = await chatFormation(chat, alienId);

          const user = await User.findOne({
            where: { id: user_id },
            attributes: ["id", "foto", "nickName"],
          });

          const chatDataAlien = {
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
            alien: user,
            scrollFocusMessageId: 0,
            stepsPlan: [],
            online: true,
          };
          io.to(user.nickName).emit("chat:incoming", {
            message: messagesValid,
          });
          io.to(alienNickName).emit("add/personal/chat", {
            chat: chatDataAlien,
          });
        }
      } else {
        io.to(data.chatId).emit("chat:incoming", { message: messagesValid });
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("add:response", async (data) => {
    const { id } = data;
  });
});

const PORT = process.env.PORT ?? 4000;

serverConfig(app);
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use("/pers", apiRouterPers);
app.use("/chats", apiRouterChats);
app.use("/chatsAbout", apiRouterChatsAbout);
app.use("/chatsInfo", apiRouterChatInfo);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../frontend/build/index.html'));
});

httpServer
  .listen(PORT)
  .on("error", (err) => console.log(err.message))
  .on("listening", () => {
    console.log("go on port");
  });
