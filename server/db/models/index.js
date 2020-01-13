const User = require('./user')
const Closet = require('./closet')

// Closet.belongsTo(User, {
//   foreignKey: {allowNull: false},
//   onDelete: 'CASCADE'
// })
// User.hasMany(Closet, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'})
Closet.belongsTo(User)
User.hasMany(Closet)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Closet
}
