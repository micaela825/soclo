const router = require('express').Router()
const {Closet} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const dresses = await Closet.findAll({
      attributes: ['imageURL', 'name', 'description']
    })
    res.json(dresses)
  } catch (err) {
    next(err)
  }
})
