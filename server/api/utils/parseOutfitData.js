const parseOutfitData = data => {
  let outerwearName = ''
  let outerwearImageURL,
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

  data.map(item => {
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
}

module.exports = parseOutfitData
