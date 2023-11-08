/* eslint-disable camelcase */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Midi_chat extends Model {
    static associate({ User, Chat }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Chat, { foreignKey: 'chat_id' });
    }
  }
  Midi_chat.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      chat_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Chats',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Midi_chat',
    },
  );
  return Midi_chat;
};
