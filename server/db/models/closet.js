const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const Closet = db.define('closet', {
  imageURL: {
    type: Sequelize.STRING
    // unique: true,
    //allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  wearCount: {
    type: Sequelize.INTEGER
  }
  // userId: {
  //   type: Sequelize.INTEGER,
  //   value: User.id
  // }
  // userIdd: {
  //   type: Sequelize.INTEGER,
  //   get() {
  //     return () => Closet.prototype.getUser()
  //   }
  // }
})

// console.log('***********', this.getUser())

module.exports = Closet

// const getUserId = async () => {
//   Closet.prototype.getUser()
// }

// Closet.beforeCreate(getUserId())
