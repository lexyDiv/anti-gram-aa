/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const {
  User, Midi_chat, Chat, Contact,
} = require('../../db/models');
const fileuploadMiddeleware = require('../../middleware/fileuploadMiddeleware');
const imgPath = require('../../public/img/path');
const getTokens = require('../../middleware/utils');
const validateAccessToken = require('../../middleware/validateAccessToken');
const validateRefrashToken = require('../../middleware/validateRefrashToken');

router.route('/users/:nickName/:userId').get(async (req, res) => {
  try {
    const { nickName, userId } = req.params;
    const users = await User.findAll({
      attributes: ['foto', 'id', 'nickName'],
    });
    const validUsers = users.filter(
      (user) => user.nickName.slice(0, nickName.length).toLowerCase()
          === nickName.toLowerCase() && user.id !== Number(userId),
    );
    res.json(validUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.route('/refrash').put(async (req, res) => {
  try {
    const { refrashToken } = req.session;
    if (refrashToken) {
      const dataUser = validateRefrashToken(refrashToken);
      if (dataUser) {
        const user = await User.findOne({ where: { id: dataUser.userId } });
        const dbTokens = JSON.parse(user.refrashTokens);
        const dbValidTokens = dbTokens.filter((token) => validateRefrashToken(token));
        const validToken = dbValidTokens.find(
          (token) => token === refrashToken,
        );
        if (validToken) {
          const { accessToken, refrashToken: newRefrashToken } = getTokens(
            dataUser.login,
            dataUser.userId,
          );
          const validTokensToDb = dbValidTokens.filter(
            (token) => token !== refrashToken,
          );
          validTokensToDb.push(newRefrashToken);
          user.refrashTokens = JSON.stringify(validTokensToDb);
          await user.save();
          req.session.refrashToken = newRefrashToken;
          res.json({ accessToken });
          return;
        }
      }
    }
    res.status(401).json({ message: refrashToken });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.route('/rePass').put(async (req, res) => {
  try {
    const { password, newPassword, userId } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    const userData = validateRefrashToken(req.session.refrashToken);
    if (userData && userData.userId === userId && user.id === userId) {
      const ok = await bcrypt.compare(password, user.password);
      if (ok) {
        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        user.save();
        res.json({ message: 'ok' });
      } else {
        res.json({ message: 'ошибка в старом пароле!' });
      }
    } else {
      res.json({ message: 'похоже на попытку взлома!' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.route('/newAvatarOut').put(async (req, res) => {
  try {
    const { userId, input } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    if (user.foto) {
      const fileName = path.basename(user.foto);
      fs.readFile(`${imgPath}/${fileName}`, (err, data) => {
        if (!err && data) {
          fs.unlinkSync(`${imgPath}/${fileName}`);
        }
      });
    }
    user.foto = input;
    user.save();
    res.json({ message: 'ok', input });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.route('/newAvatar').put(async (req, res) => {
  try {
    const { image } = req.files;
    const { userId } = req.body;
    const user = await User.findOne({
      where: { id: +userId },
    });
    if (user.foto) {
      const fileName = path.basename(user.foto);
      fs.readFile(`${imgPath}/${fileName}`, (err, data) => {
        if (!err && data) {
          fs.unlinkSync(`${imgPath}/${fileName}`);
        }
      });
    }

    const imageData = await fileuploadMiddeleware(image);
    user.foto = imageData;
    await user.save();
    res.json({ message: 'ok', userFoto: user.foto });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router
  .route('/')
  .get(async (req, res) => {
    try {
      const header = req.headers.authorization;
      const accessToken = header.split(' ')[1];
      const userData = validateAccessToken(accessToken);
      if (userData) {
        const user = await User.findOne({
          where: { id: userData.userId },
          include: {
            model: Contact,
          },
        });
        res.json({
          nickName: user.nickName,
          id: user.id,
          foto: user.foto,
          Contacts: user.Contacts,
        });
      } else {
        res.status(401).json({ message: 'err' });
      }
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const image = req.files ? req.files.image : null;
      const { password, nickName, foto } = req.body;
      const oldUser = await User.findOne({ where: { nickName } });
      if (oldUser) {
        res.status(200).json({ message: 'Этот ник успели занять!' });
        return;
      }
      let fotoData = foto;
      if (image) {
        const imageData = await fileuploadMiddeleware(image);
        fotoData = imageData;
      }
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        foto: fotoData,
        nickName,
        password: hash,
      });
      const { accessToken, refrashToken } = getTokens(nickName, user.id);
      user.refrashTokens = JSON.stringify([refrashToken]);
      await user.save();
      await Midi_chat.create({
        user_id: user.id,
        chat_id: 1,
      });
      req.session.refrashToken = refrashToken;
      res.status(200).json({
        message: 'ok',
        user: {
          foto: fotoData,
          id: user.id,
          nickName: user.nickName,
          Contacts: [],
        },
        accessToken,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const { password, nickName } = req.body;
      const user = await User.findOne({
        where: { nickName },
        include: { model: Contact },
      });
      if (user) {
        const ok = await bcrypt.compare(password, user.password);
        if (ok) {
          const { accessToken, refrashToken } = getTokens(nickName, user.id);
          const dbTokens = JSON.parse(user.refrashTokens);
          dbTokens.push(refrashToken);
          user.refrashTokens = JSON.stringify(dbTokens);
          await user.save();
          req.session.refrashToken = refrashToken;
          res.status(200).json({
            message: 'ok',
            user: {
              foto: user.foto,
              id: user.id,
              nickName: user.nickName,
              Contacts: user.Contacts,
            },
            accessToken,
          });
          return;
        }
      }
      res.status(200).json({ message: 'userMiss' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

router
  .route('/:nick')
  .get(async (req, res) => {
    try {
      const { nick } = req.params;
      const user = await User.findOne({ where: { nickName: nick } });
      const chats = await Chat.findOne({ where: { name: nick } });
      user || chats
        ? res.json({ message: 'bad' })
        : res.json({ message: 'ok' });
    } catch (err) {
      res.json({ err });
    }
  })
  .delete(async (req, res) => {
    try {
      const { nick } = req.params;
      const { refrashToken } = req.session;
      const user = await User.findOne({ where: { nickName: nick } });
      if (refrashToken) {
        const dbTokens = JSON.parse(user.refrashTokens);
        user.refrashTokens = JSON.stringify(
          dbTokens.filter((token) => token !== refrashToken),
        );
        await user.save();
      }
      req.session.destroy();
      res.clearCookie('user_sid');
      res.status(200).json({ message: 'ok' });
    } catch (err) {
      res.json({ message: err.message });
    }
  });

module.exports = router;
