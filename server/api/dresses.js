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

      attributes: [
        'id',
        'imageURL',
        'name',
        'description',
        'userId',
        'cost',
        'wearCount'
      ]
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
      wearCount: Number(req.body.wearCount),
      cost: req.body.cost,
      userId: req.session.passport.user
    })
  } catch (err) {
    console.error(err)
  }
})

router.post('/:dressId', async (req, res, next) => {
  const dressId = req.params.dressId
  console.log('here **** in dres ID **', req.params, req.body)

  // GOT HERE - new values aren't coming through in req.body, and need to figure out how to combine wearCount increment and this update
  try {
    // const dressToUpdate = await Closet.increment('wearCount', {
    //   where: {id: dressId}
    // })
    const dressToEdit = await Closet.update(req.body, {
      where: {
        id: dressId
      }
    })
    // res.send(dressToUpdate)
  } catch (err) {
    next(err)
  }
})

router.post('/:dressId', async (req, res, next) => {
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
