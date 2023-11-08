/* eslint-disable camelcase */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Midi_chat, Message, Like, Dislike, Chat, Viewed, Contact,
    }) {
      this.hasMany(Midi_chat, { foreignKey: 'user_id' });
      this.hasMany(Message, { foreignKey: 'user_id' });
      this.hasMany(Like, { foreignKey: 'user_id' });
      this.hasMany(Dislike, { foreignKey: 'user_id' });
      this.hasMany(Chat, { foreignKey: 'creator_id' });
      this.hasMany(Viewed, { foreignKey: 'user_id' });
      this.hasMany(Contact, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      nickName: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      foto: {
        type: DataTypes.TEXT,
      },
      refrashTokens: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
