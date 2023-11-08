/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({
      Midi_chat, User, Message, Contact,
    }) {
      this.belongsTo(User, { foreignKey: 'creator_id' });
      this.hasMany(Midi_chat, { foreignKey: 'chat_id' });
      this.hasMany(Message, { foreignKey: 'chat_id' });
      this.hasMany(Contact, { foreignKey: 'chat_id' });
    }
  }
  Chat.init({
    type: {
      type: DataTypes.TEXT,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.TEXT,
    },
    foto: {
      type: DataTypes.TEXT,
    },
    users: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.TEXT,
    },
    user_delete: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
