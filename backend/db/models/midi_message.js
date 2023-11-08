/* eslint-disable camelcase */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Midi_message extends Model {
    static associate({ Message }) {
      this.belongsTo(Message, { foreignKey: 'message_id' });
    }
  }
  Midi_message.init(
    {
      message_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Messages',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      about_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Midi_message',
    },
  );
  return Midi_message;
};
