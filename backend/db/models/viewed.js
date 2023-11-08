const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Viewed extends Model {
    static associate({ User, Message }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Message, { foreignKey: 'message_id' });
    }
  }
  Viewed.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    message_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Messages',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Viewed',
  });
  return Viewed;
};
