const {Sequelize} = require('sequelize')
const db = require('../db')
const User = require('./user')

const Closet = db.define('closet', {
  imageURL: {
    type: Sequelize.STRING
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
  // outfits: {
  //   type: Sequelize.ARRAY(DataTypes.JSON),
  //   defaultValue: []
  // }
  // wearDates: {
  //   type: Sequelize.ARRAY,
  // },
})

Closet.beforeValidate(instance => {
  instance.wearCount = Number(instance.wearCount)
  instance.cost = Number(instance.cost)

  // add getter for latestwear - upon create, if wearCount, latestWear == Date.Now()
})

Closet.prototype.updateWear = function(instance) {
  instance.latestWear = Date.now()
  // return instance
  // also add to array
  // need to return?
}

module.exports = Closet
