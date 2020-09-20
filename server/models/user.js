const bcrypt = require('bcrypt')

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.belongsToMany(models.Ingredient, { through: 'Inventory', foreignKey: 'userId' })
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
  User.associate = models => {
    User.belongsToMany(models.Ingredient, { through: 'Inventory', foreignKey: 'userId' })
  }
  return User
}
