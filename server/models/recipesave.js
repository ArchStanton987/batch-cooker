'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeSave extends Model {
    static associate(models) {
    }
  };
  RecipeSave.init({
    recipeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecipeSave',
  });
  return RecipeSave;
};