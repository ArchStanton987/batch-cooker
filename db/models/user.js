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
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeCreate: async function (user, options) {
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
