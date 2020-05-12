const Sequelize = require('sequelize')
const db = require('../db')

const Outfit = db.define('outfit', {
  dressImageURL: {
    type: Sequelize.STRING
  },
  dressName: {
    type: Sequelize.STRING
  },
  dressId: {
    type: Sequelize.INTEGER
  },
  topImageURL: {
    type: Sequelize.STRING
  },
  topName: {
    type: Sequelize.STRING
  },
  topId: {
    type: Sequelize.INTEGER
  },
  bottomImageURL: {
    type: Sequelize.STRING
  },
  bottomName: {
    type: Sequelize.STRING
  },
  bottomId: {
    type: Sequelize.INTEGER
  },
  shoesImageURL: {
    type: Sequelize.STRING
  },
  shoesName: {
    type: Sequelize.STRING
  },
  shoesId: {
    type: Sequelize.INTEGER
  },
  outerwearImageURL: {
    type: Sequelize.STRING
  },
  outerwearName: {
    type: Sequelize.STRING
  },
  outerwearId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Outfit
