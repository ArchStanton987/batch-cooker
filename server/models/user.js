const bcrypt = require('bcrypt')

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Ingredient, { through: models.Inventory, foreignKey: 'userId' })
      User.hasMany(models.Recipe, { foreignKey: 'creatorId' })
      User.belongsToMany(models.Recipe, { through: models.RecipeSave, foreignKey: 'userId' })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        allowNull: false,
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        validate: { len: [4, 30] },
        allowNull: false,
        unique: true
      },
      password: { type: DataTypes.STRING, validate: { len: [6, 30] }, allowNull: false },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
    },
    {
      hooks: {
        afterValidate: async function (user, options) {
          const salt = await bcrypt.genSalt(12)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
      sequelize,
      modelName: 'User'
    }
  )

  return User
}
