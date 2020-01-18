const router = require('express').Router()
const {Closet, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const dresses = await Closet.findAll({
      where: {
        userId: userId
      },
      include: [{model: User}],

      attributes: ['id', 'imageURL', 'name', 'description', 'userId']
    })
    res.json(dresses)
  } catch (err) {
    next(err)
  }
})

router.get('/:dressId', async (req, res, next) => {
  const dressId = req.params.dressId
  try {
    const dress = await Closet.findAll({
      where: {
        id: dressId
      }
    })
    res.send(dress)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newDress = await Closet.create({
      id: req.body.id,
      imageURL: req.body.imageURL,
      name: req.body.name,
      description: req.body.description,
      userId: req.session.passport.user
    })
    console.log(
      'DRESS CREATED *****',
      req.body,
      '******',

      'sessinon passport user',
      req.session.passport.user
    )
  } catch (err) {
    console.error(err)
  }
})

router.put('/:dressId', async (req, res, next) => {
  try {
    Closet.update(
      {
        imageURL: req.body.imageURL,
        name: req.body.name,
        description: req.body.description
      },
      {returning: true}
    )
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:dressId', async (req, res, next) => {
  try {
    Closet.destroy({
      where: {
        id: req.params.dressId
      }
    })
  } catch (err) {
    console.log(err)
  }
})
