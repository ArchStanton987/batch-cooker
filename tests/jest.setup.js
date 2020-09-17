const models = require('../server/models')

afterAll(() => models.sequelize.close())
