const User = require('./user')
const Closet = require('./closet')
const Outfit = require('./outfit')

Closet.belongsTo(User)
User.hasMany(Closet)
Outfit.belongsTo(User)
User.hasMany(Outfit)

module.exports = {
  User,
  Closet,
  Outfit
}
