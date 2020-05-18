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
    const dress = await Closet.findOne({
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

router.put('/:dressId', async (req, res, next) => {
  const dressId = req.params.dressId
  try {
    let dressToUpdate = await Closet.findByPk(dressId)
    let prevWearCount = dressToUpdate.dataValues.wearCount
    dressToUpdate = await dressToUpdate.update({
      wearCount: prevWearCount + 1,
      latestWear: Date.now()
    })
    res.send(dressToUpdate)
  } catch (err) {
    console.error(err)
  }
})
