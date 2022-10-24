'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class qnaView extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  qnaView.init(
    {
      ip: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      time: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'qnaView',
      timestamps: false,
    }
  );
  return qnaView;
};
