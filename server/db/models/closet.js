const Sequelize = require('sequelize')
const db = require('../db')

const Closet = db.define('closet', {
  imageURL: {
    type: Sequelize.STRING,
    // unique: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
  // userId: {
  //   type: Sequelize.INTEGER,
  //   get() {
  //     return () => Closet.prototype.getUser()
  //   }
  // }
})

module.exports = Closet

const getUserId = async () => {
  console.log('hi here **')
  console.log('closet prototype', await Closet.prototype.getUser(1))
  // const user = this.prototype.getUser()
  // console.log('USER ****', user)
  // return user.userId
}

Closet.beforeCreate(getUserId)
