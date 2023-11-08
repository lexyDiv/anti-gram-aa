const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dislike extends Model {
    static associate({ User, Message }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Message, { foreignKey: 'message_id' });
    }
  }
  Dislike.init({
    user_id: {
      type: DataTypes.INTEGER,
    },
    message_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Messages',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    date: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Dislike',
  });
  return Dislike;
};
