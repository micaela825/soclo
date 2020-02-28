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
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Closet.beforeValidate(instance => {
  instance.wearCount = Number(instance.wearCount)
  instance.cost = Number(instance.cost)
})

module.exports = Closet
