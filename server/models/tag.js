const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Recipe, { through: models.TagRecipe, foreignKey: 'tagId' })
      Tag.hasMany(models.TagRecipe)
    }
  }
  Tag.init(
    {
      tagname: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Tag'
    }
  )
  return Tag
}
