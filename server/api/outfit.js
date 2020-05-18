const router = require('express').Router()
const {Outfit} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const outfits = await Outfit.findAll({
      where: {
        userId: userId
      }

      // attributes: ['id', 'name', 'email', 'password']
    })
    res.json(outfits)
  } catch (err) {
    next(err)
  }
})

// router.delete('/', (req, res) => {
//   try {
//     Closet.destroy({
//       where: {
//         id: req.params.dressId
//       }
//     })
//   } catch (err) {
//     console.log(err)
//   }
// })

router.post('/', async (req, res, next) => {
  let outerwearName,
    outerwearImageURL,
    outerwearId,
    topImageURL,
    topName,
    topId,
    bottomId,
    bottomImageURL,
    bottomName,
    dressId,
    dressImageURL,
    dressName,
    shoesId,
    shoesImageURL,
    shoesName

  req.body.map(item => {
    switch (item.category) {
      case 'outerwear':
        outerwearImageURL = item.imageURL
        outerwearId = item.id
        outerwearName = item.name
        break
      case 'top':
        topImageURL = item.imageURL
        topId = item.id
        topName = item.name
        break
      case 'bottom':
        bottomImageURL = item.imageURL
        bottomId = item.id
        bottomName = item.name
        break
      case 'dress':
        dressImageURL = item.imageURL
        dressId = item.id
        dressName = item.name
        break
      case 'shoes':
        shoesImageURL = item.imageURL
        shoesId = item.id
        shoesName = item.name
        break
      default:
        return null
    }
  })

  try {
    await Outfit.create({
      userId: req.session.passport.user,
      dressId: dressId,
      dressImageURL: dressImageURL,
      dressName: dressName,
      topId: topId,
      topImageURL: topImageURL,
      topName: topName,
      bottomId: bottomId,
      bottomImageURL: bottomImageURL,
      bottomName: bottomName,
      outerwearId: outerwearId,
      outerwearImageURL: outerwearImageURL,
      outerwearName: outerwearName,
      shoesId: shoesId,
      shoesImageURL: shoesImageURL,
      shoesName: shoesName,
      notes: req.body.notes
    })
  } catch (err) {
    console.error(err)
  }
})
