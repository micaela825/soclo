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
        'wearCount',
        'category',
        'brand',
        'latestWear'
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
  const getWearDate = count => (Number(count) > 0 ? Date.now() : null)

  try {
    await Closet.create({
      id: req.body.id,
      imageURL: req.body.imageURL,
      name: req.body.name,
      description: req.body.description,
      wearCount: Number(req.body.wearCount),
      cost: req.body.cost,
      userId: req.session.passport.user,
      category: req.body.category,
      brand: req.body.brand,
      latestWear: getWearDate(req.body.wearCount)
    })
  } catch (err) {
    console.error(err)
  }
})

router.put('/:dressId/edit', async (req, res, next) => {
  const dressId = req.params.dressId
  try {
    const dressToEdit = await Closet.update(req.body, {
      where: {
        id: dressId
      }
    })
    res.send(dressToEdit)
  } catch (err) {
    next(err)
  }
})

router.delete('/:dressId', (req, res) => {
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
router.post('/:dressId', async (req, res, next) => {
  const dressId = req.params.dressId

  try {
    const dressToUpdate = await Closet.increment('wearCount', {
      where: {id: dressId}
    })
    // console
    //   .log('dress to update BEFORE', dressToUpdate)
    // await dressToUpdate.updateWear()
    // Closet.prototype.updateWear(dressToUpdate)

    // console.log('dress to update AFTER', dressToUpdate)

    // console.log('CLOSET', Closet.prototype.updateWear(dressToUpdate))
    res.send(dressToUpdate)
  } catch (err) {
    next(err)
  }
  // try {
  //   const dressToUpdate = await Closet.findOne({
  //     where: {id: dressId},
  //   }).then(() => Closet.prototype.updateWear(dressToUpdate))
  //   res.send(dressToUpdate)
  // } catch (err) {
  //   next(err)
  // }
})

router.post('/:dressId', async (req, res, next) => {
  const dressId = req.params.dressId

  try {
    const dressToUpdate = await Closet.increment('wearCount', {
      where: {id: dressId}
    })
    res.send(dressToUpdate)
  } catch (err) {
    next(err)
  }
})
