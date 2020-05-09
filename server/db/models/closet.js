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
  },
  category: {
    type: Sequelize.STRING
  },
  brand: {
    type: Sequelize.STRING
  },
  latestWear: {
    type: Sequelize.DATE
  }
  // wearDates: {
  //   type: Sequelize.ARRAY,
  // },
})

Closet.beforeValidate(instance => {
  instance.wearCount = Number(instance.wearCount)
  instance.cost = Number(instance.cost)
})

Closet.prototype.updateWear = function(instance) {
  console.log('here ************')
  instance.latestWear = Date.now()
  // return instance
  // also add to array
  // need to return?
}

module.exports = Closet
