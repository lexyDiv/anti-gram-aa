/* eslint-disable camelcase */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({
      Chat, User, Midi_message, Like, Dislike, Viewed,
    }) {
      this.belongsTo(Chat, { foreignKey: 'chat_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(Midi_message, { foreignKey: 'message_id' });
      this.hasMany(Like, { foreignKey: 'message_id' });
      this.hasMany(Dislike, { foreignKey: 'message_id' });
      this.hasMany(Viewed, { foreignKey: 'message_id' });
    }
  }
  Message.init(
    {
      chat_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Chats',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      midi_massage_id: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.TEXT,
      },
      emojiId: {
        type: DataTypes.INTEGER,
      },
      body: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );
  return Message;
};
