const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate({ User, Chat }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Chat, { foreignKey: 'chat_id' });
    }
  }
  Contact.init({
    user_id: {
      type: DataTypes.INTEGER,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Chats',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    alienNickName: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};
