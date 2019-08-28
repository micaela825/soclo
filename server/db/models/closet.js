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
})

module.exports = Closet
