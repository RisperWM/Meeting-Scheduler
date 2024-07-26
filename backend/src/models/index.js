const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const User = require('./user')(sequelize);
const Meeting = require('./meeting')(sequelize);

User.hasMany(Meeting, { foreignKey: 'userId' });
Meeting.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Meeting,
};
