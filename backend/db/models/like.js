const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Message }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Message, { foreignKey: 'message_id' });
    }
  }
  Like.init({
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
    modelName: 'Like',
  });
  return Like;
};
