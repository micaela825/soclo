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

router.post('/', async (req, res, next) => {
  try {
    const newDress = await Closet.create(req.body)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/:dressId', async (req, res, next) => {
  try {
    Closet.destroy({
      where: {
        name: req.params.dressId
      }
    })
  } catch (err) {
    console.log(err)
  }
})
